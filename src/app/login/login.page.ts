import { AuthService } from './shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from './shared/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public user: User = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService) { }

  ngOnInit() {}

  login() {
    this.authService.login(this.user);
  }
}