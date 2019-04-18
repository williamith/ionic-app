import { Component, OnInit } from '@angular/core';
import { Patient } from '../shared/patient';
import { ActionSheetController } from '@ionic/angular';
import { PatientsService } from '../shared/patients.service';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.scss'],
})
export class PatientEditComponent implements OnInit {
  oldPatientValues: Patient;
  newPatientValues: Patient = {
    id: this.patientsService.patient.id,
    firstName: this.patientsService.patient.firstName,
    lastName: this.patientsService.patient.lastName,
    patientId: this.patientsService.patient.patientId,
    isActive: true
  };
  deletePatientValues: Patient = {
    id: this.patientsService.patient.id,
    firstName: this.patientsService.patient.firstName,
    lastName: this.patientsService.patient.lastName,
    patientId: this.patientsService.patient.patientId,
    isActive: false
  };

  constructor(private patientsService: PatientsService, private actionSheetController: ActionSheetController) { }

  ngOnInit() {
    this.oldPatientValues = this.patientsService.patient;
  }

  editPatient() {
    this.presentActionSheetUpdatePatient();
  }

  deletePatient() {
    this.presentActionSheetDeletePatient();
  }

  resetValues() {
    this.newPatientValues = this.oldPatientValues;
  }

  async presentActionSheetUpdatePatient() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Are you sure you want to edit this patient?',
      buttons: [{
        text: 'Edit Patient',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.patientsService.updatePatient(this.newPatientValues)
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async presentActionSheetDeletePatient() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Are you sure you want to delete this patient?',
      buttons: [{
        text: 'Delete Patient',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.patientsService.updatePatient(this.deletePatientValues);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
