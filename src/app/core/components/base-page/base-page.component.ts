import { Component, Input } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
    selector: 'app-base-page',
    templateUrl: './base-page.component.html'
})
export class BasePageComponent {
    @Input() pageName = 'Page name';

    constructor(private menu: MenuController) { }

    async open(): Promise<void> {
        console.log('trigre')
        await this.menu.open();
    }
}
