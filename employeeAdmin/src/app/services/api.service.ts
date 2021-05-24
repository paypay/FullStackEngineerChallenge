import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'mode': 'no-cors',
    'Access-Control-Allow-Origin':'*'})
};
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  login(params) {
    return this.http.get('http://localhost:1337/user/login', { params: params });
  }
  getEmployees() {
    return this.http.get('http://localhost:1337/user/getEmployees');
  }
  getReviewList() {
    return this.http.get('http://localhost:1337/review/listReview');
  }
}
