import { Component, OnInit, TemplateRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss']
})
export class ListEmployeeComponent implements OnInit {
  modalRef: BsModalRef;
  public employeeList: any;
  public serverErrors = '';
  constructor(private _apiService: ApiService,
    private router: Router,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getEmployees();
  }
  getEmployees(): void {
    this.serverErrors = '';
    this._apiService.getEmployees().subscribe(
      data => {
        console.log(data);
        if (data && data['data']) {
          this.employeeList = data['data'];
        }
      },
      err =>
        console.error(err)
    );
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  onSubmit(EmployeeForm) {
    console.log(EmployeeForm);
    this._apiService.addEmployee(EmployeeForm.value).subscribe(
      data => {
        console.log(data);
        if (data && data['data']) {
          this.modalRef.hide();
          data = data['data'][0];

        } else {
          this.serverErrors = data['message'];
        }

      },
      err =>
        console.error(err)
    );
  }
}
