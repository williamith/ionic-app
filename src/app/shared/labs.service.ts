import { PatientsService } from './patients.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lab } from './lab';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LabsService {
  url: string = 'https://localhost:44394/api/labscollection';
  lab: Lab;
  labType: string;

  constructor(private http: HttpClient, private patientsService: PatientsService) { }

  createLab(lab: Lab) {
    // this.http.post<Lab>(this.url, lab);
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
}