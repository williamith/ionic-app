import { AuthService } from './../login/shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private router: Router, public authService: AuthService) { }

  ngOnInit() {
  }

  viewPatientsPage() {
    this.router.navigate(['patients']);
  }

  viewLabsPage() {
    this.router.navigate(['labs']);
  }

}
