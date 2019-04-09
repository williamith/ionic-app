import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  isDashboard = false;
  isPatients = false;
  isLabs = false;
  isPharmacists = false;

  public pages = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'analytics'
    },
    {
      title: 'Patients',
      url: '/patients',
      icon: 'people'
    },
    {
      title: 'Labs',
      url: '/labs',
      icon: 'flask'
    },
    {
      title: 'Pharmacists',
      url: '/pharmacists',
      icon: 'medkit'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  togglePage(whichPage: string): void {
    this.isDashboard = false;
    this.isPatients = false;
    this.isLabs = false;
    this.isPharmacists = false;

    let newTab: string = '';

    switch (whichPage) {
      case 'dashboard':
        this.isDashboard = true;
        newTab = 'dashboard';
        break;
      case 'patients':
        this.isPatients = true;
        newTab = 'patients';
        break;
      case 'labs':
        this.isLabs = true;
        newTab = 'labs';
        break;
      case 'pharmacists':
        this.isPharmacists = true;
        newTab = 'pharmacists';
        break;
    }

    this.router.navigate([newTab]);
  }
}
