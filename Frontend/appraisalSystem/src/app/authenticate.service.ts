import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  
  userData = new BehaviorSubject({});
  baseUrl = 'https://localhost:44355/api/Employee/';
  constructor(private http: HttpClient) {

  }
  login(reqObj) {
    const url = this.baseUrl + "Authenticate/";
    return this.http.post(url, reqObj);
  }
}
