import { Router } from '@angular/router';
import { PatientsService } from '../shared/patients.service';
import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/patients/shared/patient';
import { ToastController } from '@ionic/angular';

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

  constructor(private patientsService: PatientsService, private toastController: ToastController, private router: Router) { }

  ngOnInit() {
  }

  createPatient() {
    this.patientsService.createPatient(this.patient)
      .then(response => {
        this.presentToastPatientCreated();
        this.router.navigate(['patients']);
      }).catch(error => {
        console.log(error);
      });
  }

  async presentToastPatientCreated() {
    const toast = await this.toastController.create({
      message: `Patient created successfully`,
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'Close',
      color: 'success',
      duration: 3000
    });
    toast.present();
  }
}
