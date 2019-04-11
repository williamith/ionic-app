import { Component, OnInit } from '@angular/core';
import { Patient } from '../shared/patient';
import { Lab } from 'src/app/patients/shared/lab';
import { PatientsService } from '../shared/patients.service';
import { LabTypesService } from '../../labs/shared/labTypes.service';
import { LabsService } from '../shared/labs.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss'],
})
export class PatientDetailComponent implements OnInit {
  labTypes = []; // Lab types array for HTML string interpolation
  values = [
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
  ];
  patient: Patient; // Current patient data for HTML string interpolation
  lab: Lab = { // Lab values to be submitted to database
    patientId: this.patientsService.patient.patientId,
    labType: '',
    labValue: 0,
    date: '',
    isHidden: false
  }

  constructor(private patientsService: PatientsService, private labTypesService: LabTypesService, private labsService: LabsService, private router: Router, private toastController: ToastController) { }

  ngOnInit() {
    this.patient = this.patientsService.patient; // Sets current patient

    this.labTypesService.readLabTypes().subscribe( // Sets lab types and handle any response or error
      response => this.labTypes = response,
      error => console.log(error)
    );
  }

  createLab(labType: Lab, index: number) { // Create lab
    this.lab.labType = labType.labType;
    this.lab.labValue = parseFloat(this.values[index]); // Convert use input to a floating point number
    let date = new Date(); // Creates date object with current date and time
    this.lab.date = date.toISOString(); // Converts date object to ISO 8601 format

    this.labsService.createLab(this.lab)
      .then(response => {
        this.values[index] = ''; // Clear form data
        this.presentToastLabCreated();
      }).catch(error => {
        console.log(error);
      });
  }

  viewLabHistoryPage(labType: any) { // Get lab type and go to Lab History Page
    this.labsService.labType = this.getLabType(labType);
    this.router.navigate(['patients', 'patient-detail', 'lab-history'])
  }

  getLabType(input: any): string { // Helper function
    let result = Object.values(input);
    let labType = result[1];
    return labType.toString();
  }

  async presentToastLabCreated() {
    const toast = await this.toastController.create({
      message: `Lab recorded successfully`,
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'Close',
      color: 'dark',
      duration: 3000
    });
    toast.present();
  }
}

// Needs testing
  // getRecentLab() {
  //   this.labsService.readLabs(this.patientsService.patient.patientId).subscribe(
  //     response => {
  //       this.recentLab = response.filter(item => {
  //         return item.labType.includes(this.labsService.labType);
  //       });

  //       this.recentLab = this.recentLab[0];
  //       console.log(this.recentLab);
  //     },
  //     error => console.log(error),
  //     () => this.labs.sort(((a, b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0)))
  //   );
  // }

// for (let i = 0; i < this.labTypes.length; i++) {
  //   this.labInputValues.push(0);
  //   console.log(`labInputArray.length = ${this.labInputValues.length}`)
  // }


// createLabTypesHasLengthArray() {
  //   for (let index = 0; index < this.labTypes.length; index++) {
  //     console.log('Hello');
  //   }

  //   this.labTypes.forEach(element => {

  //   });
  // }

// this.labsService.readLabs().subscribe(
  //   response => {
  //     this.labs = response.filter(item => {
  //       return item.labType.includes(this.labsService.labType);
  //     });
  //   },
  //   error => console.log(error),
  //   () => this.labs.sort(function (obj1, obj2) { return obj1.date - obj2.date; })
  // );
