import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from './patient';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  url: string = 'https://localhost:44394/api/patients';
  patient: Patient;

  constructor(private http: HttpClient, private router: Router, private toastController: ToastController) { }

  createPatient(patient: Patient) {
    return this.http.post<Patient>(this.url, patient).toPromise()
      .then(() => {
        this.presentToast('created');
        this.router.navigate(['patients']);
      })
      .catch(error => {
        console.log(error);
      });
  }

  readPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.url);
  }

  updatePatient(patient: Patient) {
    return this.http.put<Patient>(`${this.url}/${patient.id}`, patient).toPromise()
      .then(() => {
        this.router.navigate(['dashboard']);
        this.presentToast('edited');
      })
      .catch(error => {
        console.log(error);
      });;
  }

  deletePatient(patient: Patient) {
    return this.http.put<Patient>(`${this.url}/${patient.id}`, patient).toPromise()
      .then(() => {
        this.router.navigate(['dashboard']);
        this.presentToast('deleted');
      })
      .catch(error => {
        console.log(error);
      });;
  }

  async presentToast(action: string) {
    const toast = await this.toastController.create({
      message: `Patient ${action} successfully`,
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'Close',
      color: 'success',
      duration: 3000
    });
    toast.present();
  }
}