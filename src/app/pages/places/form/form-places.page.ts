/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable curly */
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Place } from 'src/app/core/models/places.model';
import { DatabaseService } from 'src/app/core/services/database.service';
import { MapService } from 'src/app/core/services/map.service';
import { Geolocation } from '@capacitor/geolocation';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-form-places',
  templateUrl: './form-places.page.html',
  styleUrls: ['./form-places.page.scss'],
})
export class FormPlacePage implements OnInit {

  place: Place = new Place();
  editMode: boolean = false;

  constructor(private db: DatabaseService,
              private loadService: LoadingController,
              private mapService: MapService,
              private activatedRoute: ActivatedRoute) {
  }
  ngOnInit(): void {
  }

	ionViewWillEnter() {
    this.activatedRoute.paramMap.subscribe(async (params) => {
      if(params.get('id')) {
        this.editMode = true;
        this.place.id = Number(params.get('id'));
        await this.getPlace();
      } else {
        this.initMap();
      }
    });
	}

  toggleLike(event: CustomEvent): void {
    this.place.like = event.detail.checked ? 1 : 0;
  }

  save(): void {
    if(!this.validate()) return;

    if (this.place.id === 0) this.create();
    else this.update();
  }

  clearForm(): void {
    this.place = new Place();
    this.mapService.removeMarker();
  }

  validate(): boolean {
    if(this.place.name === '') return false;

    if(this.place.address === '') return false;

    return true;
  }

  private async getPlace(): Promise<void> {
    const place = await this.db.getPlace(this.place.id);
    this.place = place;
  }

  private initMap() {
    Geolocation.requestPermissions().then(async premission => {
      const coordinates = await Geolocation.getCurrentPosition();
      this.mapService.initMap([coordinates.coords.longitude, coordinates.coords.latitude]);
    });
	}

  private async create() {
    const loader = await this.loadService.create({
      showBackdrop: true
    });

    loader.present();

    this.place.location = this.mapService.getSelectedPosition().join(',');

    this.db.addPlace(
      this.place.name,
      this.place.description,
      this.place.address,
      this.place.location,
      this.place.like.toString(),
    ).then(data => {
      loader.dismiss();
      console.log(data);
      this.clearForm();
    }).catch(err => {
      console.error(err);
      loader.dismiss();
    });
  }

  private async update() {
    const loader = await this.loadService.create({
      showBackdrop: true
    });

    loader.present();

    this.db.updatePlace(this.place).then(data => {
      loader.dismiss();
      console.log(data);
    }).catch(err => {
      console.error(err);
      loader.dismiss();
    });
  }

}
