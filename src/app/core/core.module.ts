import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BasePageComponent } from './components/base-page/base-page.component';

import { MenuComponent } from './components/menu/menu.component';
import { ThemeSwitchComponent } from './components/theme-switch/theme-switch.component';

@NgModule({
  declarations: [MenuComponent, ThemeSwitchComponent, BasePageComponent],
  entryComponents: [],
  imports: [RouterModule, CommonModule],
  exports: [MenuComponent, ThemeSwitchComponent, BasePageComponent]
})
export class CoreModule {}
