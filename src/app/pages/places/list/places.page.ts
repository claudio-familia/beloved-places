import { Component, OnInit } from '@angular/core';
import { Place } from 'src/app/core/models/places.model';
import { DatabaseService } from 'src/app/core/services/database.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.page.html',
  styleUrls: ['./places.page.scss'],
})
export class PlacesPage implements OnInit {

  places: Place[] = [];

  constructor( private db: DatabaseService) { }

  ngOnInit() {
  }

  ionViewWillEnter(): void {
    this.getPlaces();
  }

  refresh(event: any) {
    setTimeout(() => {
      this.getPlaces();
      event.target.complete();
    }, 1000);
  }

  private getPlaces(): void {
    this.db.getDatabaseState().subscribe(isReady => {
      if (isReady) {
        this.db.getPlaces().subscribe(res => {
          this.places = res;
        });
      }
    });
  }
}
