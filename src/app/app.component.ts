import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Visiting later', url: '/places', icon: 'heart' }, //'/places/later'
    { title: 'Favorites places', url: '/settings', icon: 'cog' },//'/places/favorite'
  ];
  labels = [];
  userName = 'hi@ionicframework.com';

  constructor() {}
}
