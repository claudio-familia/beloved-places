import { Component } from '@angular/core';

@Component({
    selector: 'app-theme-switch',
    template: `
    <ion-item>
        <ion-label>Dark theme</ion-label>
        <ion-toggle slot="start" name="theme" color="primary" (ionChange)="toggleTheme($event)"></ion-toggle>
    </ion-item>
    `
})
export class ThemeSwitchComponent {
    // TODO Save options in files
    toggleTheme(event: CustomEvent): void {
        document.body.setAttribute('theme', event.detail.checked ? 'dark' : 'light');
    }
}
