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
    isActive: false
  };

  constructor(private patientsService: PatientsService) { }

  ngOnInit() {
  }

  createPatient() {
    // this.patientsService.createPatient(this.patient)
    //   .then(memberRef => {
    //     console.log(`Member with id of ${memberRef.id} is added`);
    //     this.router.navigate(['app/members/directory']);
    //     this.presentToastMemberCreated();
    //   });
  }

  // async presentToastMemberCreated() {
  //   const toast = await this.toastController.create({
  //     message: `Member added successfully`,
  //     showCloseButton: true,
  //     position: 'bottom',
  //     closeButtonText: 'Close',
  //     color: 'dark',
  //     duration: 3000
  //   });
  //   toast.present();
  // }
}
