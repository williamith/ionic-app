import { LabTypesService } from './shared/labTypes.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LabType } from './shared/labType';

@Component({
  selector: 'app-labs',
  templateUrl: './labs.page.html',
  styleUrls: ['./labs.page.scss'],
})
export class LabsPage implements OnInit {
  labTypes = [];

  constructor(private labTypesService: LabTypesService, private router: Router) { }

  ngOnInit() {
    this.labTypesService.readLabTypes().subscribe(
      response => { this.labTypes = response; },
      error => console.log(error)
    );
  }

  viewCreateLabTypePage() {
    this.router.navigate(['labs', 'new']);
  }

  toggleIsMandatory(labType: LabType) {
    if (labType.isMandatory === true) {
      let newLabType = {
        id: labType.id,
        labType: labType.labType,
        isMandatory: false
      };

      this.labTypesService.updateLabType(newLabType);
    } else {
      let newLabType = {
        id: labType.id,
        labType: labType.labType,
        isMandatory: true
      };

      this.labTypesService.updateLabType(newLabType);
    }
  }
}