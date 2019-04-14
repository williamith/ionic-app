import { PatientsService } from './patients.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lab } from './lab';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LabsService {
  url: string = 'https://localhost:44394/api/labscollection';
  lab: Lab;
  labType: string;

  constructor(private http: HttpClient, private patientsService: PatientsService, private toastController: ToastController, private router: Router) { }

  createLab(lab: Lab) {
    return this.http.post<Lab>(this.url, lab).toPromise()
      .then(response => {
        this.presentToast('created');
      })
      .catch(error => {
        console.log(error);
      });
  }

  readLabs(): Observable<Lab[]> {
    return this.http.get<Lab[]>(`${this.url}/${this.patientsService.patient.patientId}`);
  }

  updateLab(lab: Lab) {
    return this.http.put<Lab>(`${this.url}/${lab.id}`, lab).toPromise()
      .then(() => {
        this.router.navigate(['patients', 'patient-detail']);
        this.presentToast('edited');
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteLab(id: string) {
    return this.http.delete<Lab>(`${this.url}/${id}`).toPromise()
      .then(response => {
        this.router.navigate(['patients', 'patient-detail']);
        this.presentToast('deleted');
      })
      .catch(error => {
        console.log(error);
      });
  }

  async presentToast(action: string) {
    const toast = await this.toastController.create({
      message: `Lab ${action} successfully`,
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'Close',
      color: 'success',
      duration: 3000
    });
    toast.present();
  }
}