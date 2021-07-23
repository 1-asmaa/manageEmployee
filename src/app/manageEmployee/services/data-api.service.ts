import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { employeeModel } from '../viewModels/employee';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  readonly BaseURI = 'https://60f89f46ee56ef00179759fe.mockapi.io';
  constructor(private http: HttpClient) { }

  //getallEmployee
  getallEmployee(): Observable<employeeModel[]> {
    const newLocal =  this.http.get<employeeModel[]>(`${this.BaseURI}/employees`);
    return newLocal;
  }

  //addEmployee
  addEmployess( emp: employeeModel): Observable<employeeModel>{
    return this.http.post<employeeModel>(`${this.BaseURI}/employees`, emp);
  }

  //editEmp
  updateEmployee(id: number , data: employeeModel): Observable<employeeModel> {
    const httpoptions = {headers: new HttpHeaders({
      'Content-Typpe': 'application/json',
    })};
    return this.http.put<employeeModel>(`${this.BaseURI}/employees/${id}`, data, httpoptions);
  }

  //deleteEmp
  deleteEmployee(Emp_id: number): Observable<employeeModel> {
    const httpoptions = {headers: new HttpHeaders({
      'Content-Typpe': 'application/json',
    })};
    const delData = this.http.delete<employeeModel>(`${this.BaseURI}/employees/${Emp_id}`, httpoptions);
    return delData;
  }
}
