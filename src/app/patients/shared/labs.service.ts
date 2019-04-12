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

  labs = [];

  constructor(private http: HttpClient, private patientsService: PatientsService) { }

  createLab(lab: Lab): Promise<Lab> {
    return this.http.post<Lab>(this.url, lab).toPromise();
  }

  readLabs(): Observable<Lab[]> {
    return this.http.get<Lab[]>(`${this.url}/${this.patientsService.patient.patientId}`);
  }

  updateLab(lab: Lab): Promise<Lab> {
    return this.http.put<Lab>(`${this.url}/${lab.id}`, lab).toPromise();
  }

  deleteLab(id: string): Promise<Lab> {
    return this.http.delete<Lab>(`${this.url}/${id}`).toPromise();
  }

  refreshLabs() {
    this.readLabs().subscribe(
      response => { this.labs = response.filter(item => { return item.labType.includes(this.labType); }); },
      error => console.log(error),
      () => this.labs.sort(((a, b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0)))
    );
  }
}