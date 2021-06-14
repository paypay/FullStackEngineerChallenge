import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  selectedEmp = new BehaviorSubject<string>(null);

  baseUrl = 'https://localhost:44355/api/Employee/';
  constructor(private http: HttpClient) {

  }
  fetchEmployeeData(id) {
    const url = this.baseUrl + "ViewFeedback/" + id;
    return this.http.get(url);
  }

  fetchFeedback(id){
    const url = this.baseUrl + "GetFeedback/" + id;
    return this.http.get(url);
  }
  
  updateFeedback(obj) {
    const url = this.baseUrl + "UpdateFeedback/";
    return this.http.put(url, obj);
  }
}
