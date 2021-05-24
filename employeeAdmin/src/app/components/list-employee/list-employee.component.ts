import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss']
})
export class ListEmployeeComponent implements OnInit {
  public employeeList: any;
  public serverErrors = '';
  constructor(private _apiService: ApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.getEmployees();
  }
  getEmployees(): void {
    this.serverErrors = ''; 
    this._apiService.getEmployees().subscribe(
      data => { 
        console.log(data);
        if (data && data['data']) {
          this.employeeList  = data['data'];
        }
      });
  }
}
