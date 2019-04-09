import { Component, OnInit } from '@angular/core';
import { Patient } from '../shared/patient';
import { PatientsService } from '../shared/patients.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.page.html',
  styleUrls: ['./patients.page.scss'],
})
export class PatientsPage implements OnInit {
  patients: any;
  isError: any;
  
  constructor(private patientsService: PatientsService, private router: Router) { }

  ngOnInit() {
    this.patientsService.readPatients().subscribe(
      response => this.patients = response,
      error => {
        console.log(error);
        this.isError = true;
      },
      () => this.patients.sort(((a,b) => (a.lastName > b.lastName) ? 1 : ((b.lastName > a.lastName) ? -1 : 0)))
      );
  }

  viewCreatePatientPage() {
    this.router.navigate(['patients', 'new']);
  }

  viewPatientDetailsPage(patient: Patient) {
  this.patientsService.patient = patient;
  this.router.navigate(['patients', 'patient-detail']);
  }
}
