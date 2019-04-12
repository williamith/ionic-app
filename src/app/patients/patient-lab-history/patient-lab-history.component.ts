import { PatientsService } from '../shared/patients.service';
import { Component, OnInit } from '@angular/core';
import { LabsService } from 'src/app/patients/shared/labs.service';
import { Router } from '@angular/router';
import { Lab } from '../shared/lab';

@Component({
  selector: 'app-patient-lab-history',
  templateUrl: './patient-lab-history.component.html',
  styleUrls: ['./patient-lab-history.component.scss'],
})
export class PatientLabHistoryComponent implements OnInit {
  patient: any;
  labType: string;
  labs = [];

  constructor(private patientsService: PatientsService, private labsService: LabsService, private router: Router) { }

  ngOnInit() {
    this.patient = this.patientsService.patient;
    this.labType = this.labsService.labType;

    this.labsService.readLabs().subscribe(
      response => { this.labs = response.filter(item => { return item.labType.includes(this.labsService.labType); }); },
      error => console.log(error),
      () => { // DO NOT SHORTEN OR COMBINE THE FOLLOWING TWO STATEMENTS, IT WILL NOT WORK!!! Sorts and filters labs array by isHidden value.
        this.labs = this.labs.sort(((a, b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0))); 
        this.labs = this.labs.filter(function(lab) { return lab.isHidden === false });
      }
    );
  }

  viewPatientLabEditPage(lab: Lab) {
    this.labsService.lab = lab;
    this.router.navigate(['patients', 'patient-detail', 'lab-history', 'lab-edit']);
  }
}
