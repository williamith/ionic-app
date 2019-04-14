import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LabType } from './labType';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LabTypesService {
  url: string = 'https://localhost:44394/api/labstype';
  labType: LabType;

  constructor(private http: HttpClient, private toastController: ToastController) { }

  createLabType(labType: LabType) {
    return this.http.post<LabType>(this.url, labType).toPromise()
      .then(() => {
        this.presentToast('created');
      }).catch(error => {
        console.log(error);
      });
  }

  readLabTypes(): Observable<LabType[]> {
    return this.http.get<LabType[]>(this.url);
  }

  updateLabType(labType: LabType) {
    return this.http.put<LabType>(`${this.url}/${labType.id}`, labType).toPromise()
      .catch(error => {
        console.log(error);
      });
  }

  deleteLabType(id: string) {
    return this.http.delete<LabType>(`${this.url}/${id}`).toPromise()
      .then(() => {
        this.presentToast('deleted');
      })
      .catch(error => {
        console.log(error);
      });
  }

  async presentToast(action: string) {
    const toast = await this.toastController.create({
      message: `Lab type ${action} successfully`,
      showCloseButton: true,
      position: 'bottom',
      closeButtonText: 'Close',
      color: 'success',
      duration: 3000
    });
    toast.present();
  }
}