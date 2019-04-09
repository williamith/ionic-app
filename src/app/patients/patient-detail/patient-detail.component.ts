import { LabTypesService } from './../../shared/labTypes.service';
import { Component, OnInit } from '@angular/core';
import { Patient } from '../../shared/patient';
import { PatientsService } from '../../shared/patients.service';
import { LabsService } from './../../shared/labs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss'],
})
export class PatientDetailComponent implements OnInit {
  patient: Patient;
  labs = [];
  labTypes = [];
  filteredLabs = [];

  constructor(private patientsService: PatientsService, private labsService: LabsService, private labTypesService: LabTypesService, private router: Router) { }

  ngOnInit() {
    this.patient = this.patientsService.patient;

    this.labsService.readLabs(this.patientsService.patient.patientId).subscribe(
      response => this.labs = response,
      error => console.log(error),
      () => this.labs.sort(((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0)))
    );

    this.labTypesService.readLabTypes().subscribe(
      response => this.labTypes = response,
      error => console.log(error)
    );
  }

  viewLabHistory(labType: string) {
    this.filteredLabs = this.labs.filter(labValue => {
      return labValue.labType === labType;
    });
    
    console.log(Object.values(this.filteredLabs));

    this.router.navigate(['patients', 'patient-detail', 'lab-history'])
  }
}
