import { Component, OnInit } from '@angular/core';
import { Patient } from '../../shared/patient';
import { PatientsService } from '../../shared/patients.service';
import { LabsService } from './../../shared/labs.service';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss'],
})
export class PatientDetailComponent implements OnInit {
  patient: Patient;
  labs = [];

  constructor(private patientsService: PatientsService, private labsService: LabsService) { }

  ngOnInit() {
    this.patient = this.patientsService.patient;

    this.labsService.readLabs(this.patientsService.patient.patientId).subscribe(
      response => this.labs = response,
      error => console.log(error),
      () => this.labs.sort(((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0)))
      );
  }

}
