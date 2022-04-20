import { Component, Input } from '@angular/core';
import { MenuController, PopoverController } from '@ionic/angular';

@Component({
    selector: 'app-base-page',
    templateUrl: './base-page.component.html'
})
export class BasePageComponent {
    @Input() pageName = 'Page name';

    isSettingOpen = false;

    constructor(private menu: MenuController, private popover: PopoverController) { }

    async open(): Promise<void> {
        await this.menu.open();
    }
}
