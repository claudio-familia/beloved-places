/* eslint-disable @typescript-eslint/member-ordering */
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { Place } from '../models/places.model';


@Injectable({
	providedIn: 'root'
})
export class DatabaseService {
	private database: SQLiteObject;
	private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

	// eslint-disable-next-line @typescript-eslint/naming-convention
	PLACES = new BehaviorSubject([]);

	constructor(
		private plt: Platform,
		private sqlitePorter: SQLitePorter,
		private sqlite: SQLite,
		private http: HttpClient
	) {
		this.plt.ready().then(() => {
			this.sqlite.create({
				name: 'places.db',
				location: 'default'
			}).then(db => {
				this.database = db;
				this.seedDatabase();
			});
		});
	}

	seedDatabase() {
		this.http.get('assets/seed.sql', { responseType: 'text'})
		.subscribe(sql => {
			this.sqlitePorter.importSqlToDb(this.database, sql)
				.then(_ => {
					this.loadPlaces();
					this.dbReady.next(true);
				})
				.catch(e => console.error(e));
		});
	}

	getDatabaseState(): Observable<boolean> {
		const dbState = this.dbReady.asObservable();
		return dbState;
	}

	getPlaces(): Observable<Place[]> {
		return this.PLACES.asObservable();
	}

	async loadPlaces(): Promise<[] | void> {
		const devData = await this.database.executeSql('SELECT * FROM Place', []).then(data => {
			const places: Place[] = [];

			if (data.rows.length > 0) {
				for (let i = 0; i < data.rows.length; i++) {
					places.push({
						id: data.rows.item(i).id,
						name: data.rows.item(i).name,
						description: data.rows.item(i).description,
						address: data.rows.item(i).address,
                        location: data.rows.item(i).location,
						like: data.rows.item(i).like
					});
				}
			}
			this.PLACES.next(places);
		});
		return devData;
	}

	async addPlace(name: string, description: string, address: string, location: string, like: string = '0'): Promise<Place[] | void> {
		const data = [name, description, address, location, like];
		console.log(data);
		const updatedDb = await this.database
        .executeSql(
			`INSERT INTO place (name, description, address, location, like) 
			VALUES ('${data[0]}', '${data[1]}', '${data[2]}', '${data[3]}', '${data[4]}')`)
        .then(() => {
			this.loadPlaces();
		}).catch(err => {
			console.error(err);
		});
		return updatedDb;
	}

	async getPlace(id: number): Promise<Place> {
		const searchDbResults = await this.database.executeSql('SELECT * FROM place WHERE id = ?', [id]).then(data => ({
            id: data.rows.item(0).id,
            name: data.rows.item(0).name,
            description: data.rows.item(0).description,
            address: data.rows.item(0).address,
            location: data.rows.item(0).location,
			like: data.rows.item(0).like
			}));
		return searchDbResults;
	}

	async deletePlace(id: number): Promise<any> {
		const updatedDbAfterDeletion = await this.database.executeSql('DELETE FROM place WHERE id = ?', [id]).then(_ => {
			this.loadPlaces();
		});
		return updatedDbAfterDeletion;
	}

	async updatePlace(place: Place): Promise<any> {
		const data = [place.name, place.description, place.address, place.location, place.like];
		const updatedDb = await this.database
        .executeSql(`UPDATE place SET name = ?, description = ?, address = ?, location = ?, like = ? WHERE id = ${place.id}`, data)
        .then(() => {
			this.loadPlaces();
		});
		return updatedDb;
	}
}
