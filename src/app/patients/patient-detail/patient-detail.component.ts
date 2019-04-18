import { Component, OnInit } from '@angular/core';
import { Patient } from '../shared/patient';
import { Lab } from 'src/app/patients/shared/lab';
import { PatientsService } from '../shared/patients.service';
import { LabTypesService } from '../../labs/shared/labTypes.service';
import { LabsService } from '../shared/labs.service';
import { Router } from '@angular/router';
import { LabType } from 'src/app/labs/shared/labType';

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
    '', '', '', '', '', '', '', '', '', ''
  ];
  patient: Patient; // Current patient data for HTML string interpolation
  lab: Lab = { // Lab values to be submitted to database
    patientId: this.patientsService.patient.patientId,
    labType: '',
    labValue: 0,
    date: '',
    isHidden: false
  }
  labRecentValues = [];
  labs = [];

  constructor(private patientsService: PatientsService, private labTypesService: LabTypesService, private labsService: LabsService, private router: Router) { }

  ngOnInit() {
    this.patient = this.patientsService.patient; // Sets current patient

    this.labTypesService.readLabTypes().subscribe( // Sets lab types and handle any response or error
      response => {
        this.labTypes = response;
        for (var x = 0; x < this.labTypes.length; x++) {
          this.labRecentValues[x] = 0;
        }
      },
      error => console.log(error),
      () => { // DO NOT SHORTEN OR COMBINE THE FOLLOWING TWO STATEMENTS, IT WILL NOT WORK!!! Sorts labs array by isMandatory value.
        this.labTypes = this.labTypes.sort(((a, b) => (a.isMandatory < b.isMandatory) ? 1 : ((b.isMandatory < a.isMandatory) ? -1 : 0)));
        this.recentValues();
        this.labsService.readLabs().subscribe(
          response => this.labs = response,
          error => console.log(error),
          () => { // DO NOT SHORTEN OR COMBINE THE FOLLOWING TWO STATEMENTS, IT WILL NOT WORK!!! Sorts and filters labs array by isHidden value.
            this.labs = this.labs.sort(((a, b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0))); 
            this.labs = this.labs.filter(function(lab) { return lab.isHidden === false });
            
            for (let x = 0; x < this.labTypes.length; x++) {
              var type: LabType = this.labTypes[x];
              var array = this.labs.filter(function(lab) {
                return lab.labType === type.labType;
              });
              this.labRecentValues[x] = array;
            }
            console.log(this.labRecentValues);
          }
        );
      }
    );
  }

  recentValues() {
    console.log(this.labTypes[0]);
  }

  createLab(labType: Lab, index: number) { // Create lab
    this.lab.labType = labType.labType;
    this.lab.labValue = parseFloat(this.values[index]); // Convert use input to a floating point number
    let date = new Date(); // Creates date object with current date and time
    this.lab.date = date.toISOString(); // Converts date object to ISO 8601 format

    this.labsService.createLab(this.lab)
      .then(response => {
        this.values[index] = ''; // Clear form data
      })
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
}
