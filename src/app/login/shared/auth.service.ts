import { User } from './user';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userIsAuthenticated: boolean;

  constructor(private router: Router, private toastController: ToastController) { }

  getUserIsAuthenticated() {
    return this.userIsAuthenticated;
  }

  login(user: User) {
    if (user.email === 'user' && user.password === 'user') {
      this.userIsAuthenticated = true;
      console.log('User is logged in!');
      this.router.navigate(['dashboard']);
    }
    else {
      this.presentToast();
    }
  }

  logout() {
    console.log('User is not logged in!');
    this.userIsAuthenticated = false;
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: `Incorrect username or password.`,
      showCloseButton: false,
      position: 'bottom',
      closeButtonText: 'Close',
      color: 'danger',
      duration: 3000
    });
    toast.present();
  }
}
