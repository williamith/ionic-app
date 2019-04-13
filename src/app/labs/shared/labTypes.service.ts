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

  createLabType(labType: LabType): Promise<LabType> {
    return this.http.post<LabType>(this.url, labType).toPromise();
  }

  readLabTypes(): Observable<LabType[]>  {
    return this.http.get<LabType[]>(this.url);
  }

  updateLabType(labType: LabType): Promise<LabType> {
    return this.http.put<LabType>(`${this.url}/${labType.id}`, labType).toPromise();
  }

  deleteLabType(id: string): Promise<LabType> {
    return this.http.delete<LabType>(`${this.url}/${id}`).toPromise();
  }
}