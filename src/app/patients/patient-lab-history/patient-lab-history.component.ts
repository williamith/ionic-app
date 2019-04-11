import { PatientsService } from './../../shared/patients.service';
import { Component, OnInit } from '@angular/core';
import { LabsService } from 'src/app/shared/labs.service';

@Component({
  selector: 'app-patient-lab-history',
  templateUrl: './patient-lab-history.component.html',
  styleUrls: ['./patient-lab-history.component.scss'],
})
export class PatientLabHistoryComponent implements OnInit {
  patient: any;
  labType: string;
  labs = [];

  constructor(private patientsService: PatientsService, private labsService: LabsService) { }

  ngOnInit() {
    this.patient = this.patientsService.patient;
    this.labType = this.labsService.labType;

    this.labsService.readLabs().subscribe(
      response => { this.labs = response.filter(item => { return item.labType.includes(this.labsService.labType); });},
      error => console.log(error),
      () => this.labs.sort(((a, b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0)))
    );
  }
}
