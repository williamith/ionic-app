import { ToastController } from '@ionic/angular';
import { LabsService } from './../shared/labs.service';
import { Component, OnInit } from '@angular/core';
import { Lab } from '../shared/lab';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-lab-edit',
  templateUrl: './patient-lab-edit.component.html',
  styleUrls: ['./patient-lab-edit.component.scss'],
})
export class PatientLabEditComponent implements OnInit {
  oldLabValues: Lab;
  // {
  //   patientId: this.labsService.lab.patientId,
  //   labType: this.labsService.lab.labType,
  //   labValue: this.labsService.lab.labValue,
  //   date: this.labsService.lab.date,
  //   isHidden: this.labsService.lab.isHidden,
  // };
  newLabValues: Lab = {
    id: this.labsService.lab.id,
    patientId: this.labsService.lab.patientId,
    labType: this.labsService.lab.labType,
    labValue: undefined,
    date: this.labsService.lab.date,
    isHidden: this.labsService.lab.isHidden,
  };

  constructor(private labsService: LabsService, private toastController: ToastController, private router: Router) { }

  ngOnInit() {
    this.oldLabValues = this.labsService.lab;
  }

  editLab() {
    this.labsService.updateLab(this.newLabValues)
      .then(response => {
        this.router.navigate(['patients', 'patient-detail', 'lab-history']);
        this.presentToastLabEdited();
      }).catch(error => {
        console.log(error);
      });;
  }

  resetValues() {
    this.newLabValues.labValue = undefined;
  }

  async presentToastLabEdited() {
    const toast = await this.toastController.create({
      message: `Lab edited successfully`,
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'Close',
      color: 'dark',
      duration: 3000
    });
    toast.present();
  }
}
