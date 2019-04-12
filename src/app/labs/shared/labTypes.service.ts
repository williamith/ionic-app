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

  // TEST
  createLabType(labType: LabType): Promise<LabType> {
    return this.http.post<LabType>(this.url, labType).toPromise();
  }

  readLabTypes(): Observable<LabType[]>  {
    return this.http.get<LabType[]>(this.url);
  }

  updateLabType(labType: LabType): Promise<LabType> {
    return this.http.put<LabType>(this.url, labType).toPromise();
  }

  deleteLabType(labType: LabType) {
    // return this.http.put<LabType>(this.url, labType);
  }
}