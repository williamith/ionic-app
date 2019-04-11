import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from './patient';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  url: string = 'https://localhost:44394/api/patients';
  patient: Patient;

  constructor(private http: HttpClient) { }

  createPatient(patient: Patient) {
    this.http.post<Patient>(this.url, patient);
  }

  readPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.url);
  }

  updatePatient(patient: Patient) {
    return this.http.put<Patient>(this.url, patient);
  }

  deletePatient(patient: Patient) {
    return this.http.put<Patient>(this.url, patient);
  }
}