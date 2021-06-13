import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  EmployeeBasicDetails = new BehaviorSubject([]);
  EmployeeList = new BehaviorSubject<any>([]);

  baseUrl = 'https://localhost:44355/api/WebMaster/';
  constructor(private http: HttpClient) {

  }
  fetchEmployee() {
    const url = this.baseUrl + "GetEmployee/";
    return this.http.get(url);
  }

  getEmployeeAdditionalData(id) {
    const url = this.baseUrl + "EmployeeAdditionalInfo/" + id;
    return this.http.get(url);
  }
  assignNewEmployee(obj){
    const url = this.baseUrl + "AssignFeedback/";
    return this.http.post(url, obj);
  }

  deleteAssignedFeedback(id){
    const url = this.baseUrl + "DeleteEmployeeFeedback/" + id;
    return this.http.delete(url);
  }
  updateFeedback(obj) {
    const url = "https://localhost:44355/api/Employee/UpdateFeedback/";
    return this.http.put(url, obj);
  }

  addNewEmployee(obj){
    const url = this.baseUrl + "CreateEmployee/";
    return this.http.post(url, obj);
  }

  updateBasicInfo(obj){
    const url = this.baseUrl + "UpdateEmployeeDetails/";
    return this.http.put(url, obj);
  }

  deleteEmployee(id){
    const url = this.baseUrl + "DeleteEmployee/" + id;
    return this.http.delete(url);
  }
}
