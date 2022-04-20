import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CoreModule } from 'src/app/core/core.module';
import { DetailPlacesPage } from './detail/detail-places.page';
import { FormPlacePage } from './form/form-places.page';
import { PlacesPage } from './list/places.page';
import { PlaceRoutingModule } from './place-routing.module';


@NgModule({
  declarations: [PlacesPage, FormPlacePage, DetailPlacesPage],
  entryComponents: [],
  imports: [
    RouterModule,
    IonicModule,
    PlaceRoutingModule,
    CoreModule,
    CommonModule,
    FormsModule
  ],
  exports: []
})
export class PlaceModule {}
