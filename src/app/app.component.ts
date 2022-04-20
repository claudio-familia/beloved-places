import { Component, OnInit } from '@angular/core';
import { FileService } from './core/services/file.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Visiting later', url: '/places', icon: 'business' }, //'/places/later'
    { title: 'Favorites places', url: '/places/favorite', icon: 'heart' },//'/places/favorite'
  ];
  labels = [];
  userName = 'hi@ionicframework.com';

  constructor(private pref: FileService) {
  }

  async ngOnInit() {
    const data = await this.pref.get('settings');
    const settings = JSON.parse(data);
    document.body.setAttribute('theme', settings.theme);
    this.userName = settings.userName;
  }
}
