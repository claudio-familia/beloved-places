export class SettingsModel {
    theme: 'dark' | 'light';
    markerColor: 'blue' | 'gray' | 'green' | 'orange' | 'pink' | 'purple' | 'red' | 'yellow';
    userName: string;

    constructor() {
        this.theme = 'light';
        this.markerColor = 'red';
        this.userName = 'Beloved Places';
    }
}
