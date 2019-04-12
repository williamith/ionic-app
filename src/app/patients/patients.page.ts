import { Component, OnInit } from '@angular/core';
import { Patient } from './shared/patient';
import { PatientsService } from './shared/patients.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.page.html',
  styleUrls: ['./patients.page.scss'],
})
export class PatientsPage implements OnInit {
  patients = [];

  constructor(private patientsService: PatientsService, private router: Router) { }

  ngOnInit() {
    this.patientsService.readPatients().subscribe(
      response => { this.patients = response; },
      error => console.log(error),
      () => { // DO NOT SHORTEN OR COMBINE THE FOLLOWING TWO STATEMENTS, IT WILL NOT WORK!!! Filters patients array by isActive value.
        this.patients = this.patients.filter(function (patient) { return patient.isActive === true });
      }
    );
  }

  viewCreatePatientPage() {
    this.router.navigate(['patients', 'new']);
  }

  viewPatientDetailsPage(patient: Patient) {
    this.patientsService.patient = patient;
    this.router.navigate(['patients', 'patient-detail']);
  }

  viewPatientEditPage(patient: Patient) {
    this.patientsService.patient = patient;
    this.router.navigate(['patients', 'patient-edit']);
  }
}
