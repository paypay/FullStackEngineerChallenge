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
  getReviewListId(id) {
    return this.http.get('http://localhost:1337/review/listReview?id='+id);
  } 
  getForReviewListId(id) {
    return this.http.get('http://localhost:1337/review/listForReview?id='+id);
  } 
  addEmployee(params) {
    return this.http.post('http://localhost:1337/user/addEmployee', params);
  }
  updateEmployee(params) {
    return this.http.put('http://localhost:1337/user/updateEmployee', params);
  }
  deleteEmployee(id) {
    return this.http.delete('http://localhost:1337/user/deleteEmployee?id='+id);
  }
  assignReviewer(params) {
    return this.http.post('http://localhost:1337/review/assignReviewer', params);
  }
  addReview(params) {
    return this.http.post('http://localhost:1337/review/addReview', params);
  }
}
