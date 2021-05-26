import { Component, OnInit, TemplateRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss']
})
export class ListEmployeeComponent implements OnInit {
  modalRef: BsModalRef;
  public employeeList: any;
  public empAction = false;
  public displayName: any;
  public username: any;
  public age: any;
  public gender: any;
  public department: any;
  public address: any;
  public id = null;
  public serverErrors = '';
  public empList: any;
  public reviewer= null;
  constructor(private _apiService: ApiService,
    private router: Router,
    private toastr: ToastrService,
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
  openModal(template: TemplateRef<any>, employee?, list?) {
    if (employee) {
      this.empAction = true;
      this.displayName = employee.displayName;
      this.username = employee.username;
      this.age = employee.age;
      this.gender = employee.gender;
      this.department = employee.department;
      this.address = employee.address;
      this.id = employee.id;
    } else {
      this.empAction = false;
      this.displayName = '';
      this.username = '';
      this.age = '';
      this.gender = '';
      this.department = '';
      this.address = '';
      this.id = '';
    }
    if (list) {
      this.empList = _.filter(list, function(user) {
        return user.id !== employee.id;
      });
    }
    this.modalRef = this.modalService.show(template);
  }
  onSubmit(EmployeeForm) {
    if (!this.empAction) {
      this._apiService.addEmployee(EmployeeForm.value).subscribe(
        data => {
          console.log(data);
          if (data && data['status'] === 1) {
            this.modalRef.hide();
            this.showSuccess('Successfully Saved');
            this.getEmployees();
          } else {
            this.serverErrors = data['message'];
          }

        },
        err =>
          console.error(err)
      );
    } else {
      this._apiService.updateEmployee(EmployeeForm.value).subscribe(
        data => {
          console.log(data);
          if (data && data['status'] == 1) {
            this.modalRef.hide();
            this.showSuccess('Successfully Updated');
            this.getEmployees();
          } else {
            this.serverErrors = data['message'];
          }

        },
        err =>
          console.error(err)
      );
    }

  }
  assignSubmit(ReviewForm) {
      let params= {
        userId  : ReviewForm.value.id,
        fromUserId  :  ReviewForm.value.reviewer
      }
      this._apiService.assignReviewer(params).subscribe(
        data => {
          console.log(data);
          if (data && data['status'] === 1) {
            this.modalRef.hide();
            this.showSuccess('Assigned Reviewer');
            this.router.navigateByUrl('/list-reviews');
          } else {
            this.serverErrors = data['message'];
          }

        },
        err =>
          console.error(err)
      );
  }
  confirmModal(template: TemplateRef<any>, employee?) {
    if (employee) {
      this.displayName = employee.displayName;
      this.username = employee.username;
      this.id = employee.id;
    }
    this.modalRef = this.modalService.show(template);
  }
  delete(id) {
    this._apiService.deleteEmployee(id).subscribe(
      data => {
        console.log(data);
        this.showSuccess('Deleted employee');
        this.modalRef.hide();
        this.getEmployees();
      },
      err =>
        console.error(err)
    );
  }
  reviewModal(template: TemplateRef<any>, employee) {
    this.displayName = employee.displayName;
    this.username = employee.username;
    this.id = employee.id;
    let params= {
      userId  : employee.id,
      fromUserId  :  1
    }
    this._apiService.assignReviewer(params).subscribe();
    this.modalRef = this.modalService.show(template);
  }
  reviewSubmit(ReviewerForm,rating) {
    let params= {
      id  : ReviewerForm.value.id,
      fromId  :  1,
      comment : ReviewerForm.value.comment,
      review  : rating
    }
    this._apiService.addReview(params).subscribe(
      data => {
        console.log(data);
        if (data && data['status'] === 1) {
          this.modalRef.hide();
          this.showSuccess('Review Submitted');
          this.router.navigateByUrl('/list-reviews');
        } else {
          this.serverErrors = data['message'];
        }

      },
      err =>
        console.error(err)
    );
  }
  showSuccess(text) {
    this.toastr.success( text, 'Success');
  }
  showError(text) {
    this.toastr.error( text, 'Error');
  }
}
