/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Place } from 'src/app/core/models/places.model';
import { DatabaseService } from 'src/app/core/services/database.service';
import { MapService } from 'src/app/core/services/map.service';

@Component({
  selector: 'app-detail-places',
  templateUrl: './detail-places.page.html',
  styleUrls: ['./detail-places.page.scss'],
})
export class DetailPlacesPage implements OnInit {

  place: Place = new Place();

  constructor(private activatedRoute: ActivatedRoute,
              private database: DatabaseService,
              private mapService: MapService) { }

  ngOnInit() {
  }

  ionViewWillEnter(): void {
    this.activatedRoute.paramMap.subscribe(async (params) => {
      this.place.id = Number(params.get('id'));
      await this.getPlace();
      this.initMap();
    });
  }

  ionViewWillLeave(): void {
    this.mapService.removeMarker();
    this.mapService.destroyMap();
  }

  initMap() {
    const location = this.place.location.split(',');

    if(location.length > 1) {
      const ltlng = [Number(location[0]), Number(location[1])];
      this.mapService.initMap(ltlng);
      this.mapService.addMarker(this.place.name, ltlng);
    }
  }

  private async getPlace(): Promise<void> {
    const place = await this.database.getPlace(this.place.id);
    this.place = place;
  }

}
