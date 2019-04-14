import { LabTypesService } from './../shared/labTypes.service';
import { Component, OnInit } from '@angular/core';
import { LabType } from '../shared/labType';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lab-type-create',
  templateUrl: './lab-type-create.component.html',
  styleUrls: ['./lab-type-create.component.scss'],
})
export class LabTypeCreateComponent implements OnInit {
  labType: LabType = {
    labType: '',
    isMandatory: true
  };

  constructor(private labTypesService: LabTypesService, private router: Router) { }

  ngOnInit() { }

  createLabType() {
    this.labTypesService.createLabType(this.labType)
      .then(() => this.router.navigate(['labs']))
  }
}