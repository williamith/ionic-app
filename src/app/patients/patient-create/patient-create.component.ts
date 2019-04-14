import { PatientsService } from '../shared/patients.service';
import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/patients/shared/patient';

@Component({
  selector: 'app-patient-create',
  templateUrl: './patient-create.component.html',
  styleUrls: ['./patient-create.component.scss'],
})
export class PatientCreateComponent implements OnInit {
  patient: Patient = {
    patientId: '',
    firstName: '',
    lastName: '',
    isActive: true
  };

  constructor(private patientsService: PatientsService) {}

  ngOnInit() {}

  createPatient() {
    this.patientsService.createPatient(this.patient);
  }
}
