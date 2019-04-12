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

  createPatient(patient: Patient): Promise<Patient> {
    return this.http.post<Patient>(this.url, patient).toPromise();
  }

  readPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.url);
  }

  updatePatient(patient: Patient): Promise<Patient> {
    return this.http.put<Patient>(`${this.url}/${patient.id}`, patient).toPromise();
  }

  deletePatient(id: string): Promise<Patient> {
    return this.http.delete<Patient>(`${this.url}/${id}`).toPromise()
  }
}