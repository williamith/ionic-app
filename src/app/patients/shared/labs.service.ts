import { PatientsService } from './patients.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lab } from './lab';

@Injectable({
  providedIn: 'root'
})
export class LabsService {
  url: string = 'https://localhost:44394/api/labscollection';
  lab: Lab;
  labType: string;

  constructor(private http: HttpClient, private patientsService: PatientsService) { }

  createLab(lab: Lab): Promise<Lab> {
    return this.http.post<Lab>(this.url, lab).toPromise();
  }

  readLabs(): Observable<Lab[]> {
    return this.http.get<Lab[]>(`${this.url}/${this.patientsService.patient.patientId}`);
  }

  // Fix API issue 405 error
  updateLab(lab: Lab): Promise<Lab> {
    return this.http.put<Lab>(`${this.url}/${lab.id}`, lab).toPromise();
  }

  deleteLab(lab: Lab) {
    // return this.http.put<Lab>(`this.url/${lab.id}`, lab).toPromise;
  }
}