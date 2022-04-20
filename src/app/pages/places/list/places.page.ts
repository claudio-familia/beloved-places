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
    this.getPlaces();
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
