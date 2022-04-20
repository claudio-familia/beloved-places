import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DetailPlacesPage } from './detail/detail-places.page';
import { FormPlacePage } from './form/form-places.page';
import { PlacesPage } from './list/places.page';

const routes: Routes = [
  {
    path: '',
    component: PlacesPage
  },
  {
    path: 'create',
    component: FormPlacePage
  },
  {
    path: 'edit/:id',
    component: FormPlacePage
  },
  {
    path: 'detail/:id',
    component: DetailPlacesPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PlaceRoutingModule {}
