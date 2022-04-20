import { Component, OnInit } from '@angular/core';
import { SettingsModel } from 'src/app/core/models/settings.model';
import { FileService } from 'src/app/core/services/file.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  settings: SettingsModel = new SettingsModel();
  keySettings = 'settings';
  markerColors = ['blue', 'gray', 'green', 'orange', 'pink', 'purple', 'red', 'yellow'];
  isDark = false;

  constructor(private fileService: FileService) { }

  ngOnInit() {}

  ionViewWillEnter(): void {
    this.fileService.get(this.keySettings).then(data => {
      if(data) {
        const oldSettings = JSON.parse(data);
        this.settings = {...oldSettings};
        if(oldSettings.theme === 'dark') {
          this.isDark = true;
        } else {
          this.isDark = false;
        }
      }
    });
  }

  toggleTheme(event: CustomEvent): void {
    this.settings.theme = event.detail.checked ? 'dark' : 'light';
  }

  save(): void {
    this.fileService.set({
      key: this.keySettings,
      value: JSON.stringify(this.settings)
    });
  }
}
