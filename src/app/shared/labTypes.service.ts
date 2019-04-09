import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LabType } from './labType';

@Injectable({
  providedIn: 'root'
})
export class LabTypesService {
  url: string = 'https://localhost:44394/api/labstype';
  labType: LabType;

  constructor(private http: HttpClient) { }

  createLabType(labType: LabType) {
    // this.http.post<LabType>(this.url, labType);
  }

  readLabTypes(): Observable<LabType[]>  {
    return this.http.get<LabType[]>(this.url);
  }

  updateLabType(labType: LabType) {
    // return this.http.put<LabType>(this.url, labType);
  }

  deleteLabType(labType: LabType) {
    // return this.http.put<LabType>(this.url, labType);
  }
}