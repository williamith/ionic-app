import { PatientsService } from './patients.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lab } from './lab';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LabsService {
  url: string = 'https://localhost:44394/api/labscollection';
  lab: Lab;
  labType: string;

  constructor(private http: HttpClient, private patientsService: PatientsService, private toastController: ToastController) { }

  createLab(lab: Lab) {
    // this.http.post<Lab>(this.url, lab);
    console.log(lab);
  }

  readLabs(): Observable<Lab[]>  {
    return this.http.get<Lab[]>(`${this.url}/${this.patientsService.patient.patientId}`);
  }

  updateLab(lab: Lab) {
    // return this.http.put<Lab>(this.url, lab);
  }

  deleteLab(lab: Lab) {
    // return this.http.put<Lab>(this.url, lab);
  }

  async presentToastLabCreated() {
    const toast = await this.toastController.create({
      message: 'Lab added successfully',
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'Close',
      color: 'dark',
      duration: 3000
    });
    toast.present();
  }
}