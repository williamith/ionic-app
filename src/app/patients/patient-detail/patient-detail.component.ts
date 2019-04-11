import { LabTypesService } from './../../shared/labTypes.service';
import { Component, OnInit } from '@angular/core';
import { Patient } from '../../shared/patient';
import { PatientsService } from '../../shared/patients.service';
import { LabsService } from './../../shared/labs.service';
import { Router } from '@angular/router';
import { Lab } from 'src/app/shared/lab';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss'],
})
export class PatientDetailComponent implements OnInit {
  patient: Patient;
  labTypes = [];

  labs = [];
  labInputValues = [];

  constructor(private patientsService: PatientsService, private labsService: LabsService, private labTypesService: LabTypesService, private router: Router) { }

  ngOnInit() {
    // Sets current patient for interpolation
    this.patient = this.patientsService.patient;

    // Sets labTypes for interpolation
    this.labTypesService.readLabTypes().subscribe(
      response => this.labTypes = response,
      error => console.log(error)
    );

    this.createLabTypesHasLengthArray();

    this.labsService.readLabs().subscribe(
      response => {
        this.labs = response.filter(item => {
          return item.labType.includes(this.labsService.labType);
        });
      },
      error => console.log(error),
      () => this.labs.sort(function (obj1, obj2) { return obj1.date - obj2.date; })
    );
  }

  createLab(lab: Lab) {
    this.labsService.createLab(lab);
    // for (let i = 0; i < this.labTypes.length; i++) {
    //   this.labInputValues.push(0);
    //   console.log(`labInputArray.length = ${this.labInputValues.length}`)
    // }
  }

  createLabTypesHasLengthArray() {
    for (let index = 0; index < this.labTypes.length; index++) {
      console.log('Hello');
    }

    this.labTypes.forEach(element => {

    });
  }

  viewLabHistoryPage(labType: any) {
    this.labsService.labType = this.getLabType(labType);
    this.router.navigate(['patients', 'patient-detail', 'lab-history'])
  }

  getLabType(input: any): string {
    let result = Object.values(input);
    let labType = result[1];
    return labType.toString();
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
}
