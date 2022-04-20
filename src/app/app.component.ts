import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Visiting later', url: '/places', icon: 'business' }, //'/places/later'
    { title: 'Favorites places', url: '/places/create', icon: 'heart' },//'/places/favorite'
  ];
  labels = [];
  userName = 'hi@ionicframework.com';

  constructor() {
  }
}
