import { ToastController } from '@ionic/angular';
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

  constructor(private labTypesService: LabTypesService, private router: Router, private toastController: ToastController) { }

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
      let newLabType = { id: labType.id, labType: labType.labType, isMandatory: false };

      this.labTypesService.updateLabType(newLabType)
        .then(response => {
          this.ngOnInit();
        }).catch(error => {
          console.log(error);
        });
    }
    else {
      let newLabType = { id: labType.id, labType: labType.labType, isMandatory: true };

      this.labTypesService.updateLabType(newLabType)
        .then(response => {
          this.ngOnInit();
        }).catch(error => {
          console.log(error);
        });
    }
  }

  deleteLabType(labType: LabType) {
    this.labTypesService.deleteLabType(labType.id)
      .then(() => {
        this.presentToastLabTypeDeleted();
        this.ngOnInit();
      }).catch(error => {
        console.log(error);
      });;
  }

  async presentToastLabTypeDeleted() {
    const toast = await this.toastController.create({
      message: `Lab type deleted successfully`,
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'Close',
      color: 'success',
      duration: 3000
    });
    toast.present();
  }
}