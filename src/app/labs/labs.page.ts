import { LabTypesService } from './shared/labTypes.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LabType } from './shared/labType';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-labs',
  templateUrl: './labs.page.html',
  styleUrls: ['./labs.page.scss'],
})
export class LabsPage implements OnInit {
  labTypes: Observable<LabType[]>;

  constructor(private labTypesService: LabTypesService, private router: Router) { }

  ngOnInit() {
    this.labTypes = this.labTypesService.readLabTypes();
  }

  viewCreateLabTypePage() {
    this.router.navigate(['labs', 'new']);
  }

  toggleIsMandatory(labType: LabType) {
    if (labType.isMandatory === true) {
      let newLabType = { id: labType.id, labType: labType.labType, isMandatory: false };

      this.labTypesService.updateLabType(newLabType)
        .then(() => {
          this.ngOnInit();
        });
    }
    else {
      let newLabType = { id: labType.id, labType: labType.labType, isMandatory: true };

      this.labTypesService.updateLabType(newLabType)
        .then(() => {
          this.ngOnInit();
        });
    }
  }

  // deleteLabType(labType: LabType) {
  //   this.labTypesService.deleteLabType(labType.id)
  //     .then(() => {
  //       this.ngOnInit();
  //     });
  // }
}