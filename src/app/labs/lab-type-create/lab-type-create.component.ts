import { LabTypesService } from './../shared/labTypes.service';
import { Component, OnInit } from '@angular/core';
import { LabType } from '../shared/labType';
import { ToastController } from '@ionic/angular';

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

  constructor(private labTypesService: LabTypesService, private toastController: ToastController) { }

  ngOnInit() { }

  createLabType() {
    this.labTypesService.createLabType(this.labType)
      .then(response => {
        this.presentToastLabTypeCreated();
        this.ngOnInit();
      }).catch(error => {
        console.log(error);
      });
  }

  async presentToastLabTypeCreated() {
    const toast = await this.toastController.create({
      message: `Lab type created successfully`,
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'Close',
      color: 'success',
      duration: 3000
    });
    toast.present();
  }
}