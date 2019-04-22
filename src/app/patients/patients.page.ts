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
  loadedPatients = [];

  constructor(private patientsService: PatientsService, private router: Router) { }

  ngOnInit() {
    this.patientsService.readPatients().subscribe(
      response => {
        this.patients = response;
        this.loadedPatients = response;
      },
      error => console.log(error),
      () => { this.patients = this.patients.filter(function (patient) { return patient.isActive === true }); }
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

  initializeItems(): void {
    this.patients = this.loadedPatients;
  }

  filterList(event: any) {
    this.initializeItems();

    const searchTerm = event.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.patients = this.patients.filter(patient => {
      if (patient.lastName && searchTerm) {
        if (patient.lastName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }
}
