import { ToastController, ActionSheetController } from '@ionic/angular';
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
    isHidden: this.labsService.lab.isHidden
  };
  deleteLabValues: Lab = {
    id: this.labsService.lab.id,
    patientId: this.labsService.lab.patientId,
    labType: this.labsService.lab.labType,
    labValue: this.labsService.lab.labValue,
    date: this.labsService.lab.date,
    isHidden: true
  };

  constructor(private labsService: LabsService, private actionSheetController: ActionSheetController, private toastController: ToastController, private router: Router) { }

  ngOnInit() {
    this.oldLabValues = this.labsService.lab;
  }

  editLab() {
    this.presentActionSheetUpdateLab();
  }

  // Test if works
  deleteLab() {
    this.presentActionSheetDeleteLab();
  }

  resetValues() {
    this.newLabValues.labValue = undefined;
  }

  async presentActionSheetUpdateLab() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Are you sure you want to edit this lab?',
      buttons: [{
        text: 'Edit Lab',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.labsService.updateLab(this.newLabValues)
          .then(response => {
            this.router.navigate(['patients', 'patient-detail']);
            this.presentToastLabEdited();
          }).catch(error => {
            console.log(error);
          });
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  // SOFT DELETE METHOD
  // async presentActionSheetDeleteLab() {
  //   const actionSheet = await this.actionSheetController.create({
  //     header: 'Are you sure you want to edit this lab?',
  //     buttons: [{
  //       text: 'Delete Lab',
  //       role: 'destructive',
  //       icon: 'trash',
  //       handler: () => {
  //         this.labsService.updateLab(this.deleteLabValues)
  //         .then(response => {
  //           this.router.navigate(['patients', 'patient-detail']);
  //           this.presentToastLabDeleted();
  //         }).catch(error => {
  //           console.log(error);
  //         });
  //       }
  //     }, {
  //       text: 'Cancel',
  //       icon: 'close',
  //       role: 'cancel',
  //       handler: () => {
  //         console.log('Cancel clicked');
  //       }
  //     }]
  //   });
  //   await actionSheet.present();
  // }

  // HARD DELETE METHOD
  async presentActionSheetDeleteLab() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Are you sure you want to delete this lab?',
      buttons: [{
        text: 'Delete Lab',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.labsService.deleteLab(this.oldLabValues.id)
          .then(response => {
            this.router.navigate(['patients', 'patient-detail']);
            this.presentToastLabDeleted();
          }).catch(error => {
            console.log(error);
          });
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
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

  async presentToastLabDeleted() {
    const toast = await this.toastController.create({
      message: `Lab deleted successfully`,
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'Close',
      color: 'dark',
      duration: 3000
    });
    toast.present();
  }
}
