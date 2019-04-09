import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lab } from './lab';

@Injectable({
  providedIn: 'root'
})
export class LabsService {
  url: string = 'https://localhost:44311/api/labscollection';
  lab: Lab;

  constructor(private http: HttpClient) { }

  createLab(lab: Lab) {
    this.http.post<Lab>(this.url, lab);
  }

  readLabs(patientId: string): Observable<Lab[]>  {
    return this.http.get<Lab[]>(`${this.url}/${patientId}`);
  }

  updateLab(lab: Lab) {
    return this.http.put<Lab>(this.url, lab);
  }

  deleteLab(lab: Lab) {
    return this.http.put<Lab>(this.url, lab);
  }
}