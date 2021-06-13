import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import * as _ from 'lodash';
import { SidenavRightPanelContentService } from '../../common/services/side-nav-panel.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-employee-details',
  templateUrl: './view-employee-details.component.html',
  styleUrls: ['./view-employee-details.component.scss']
})
export class ViewEmployeeDetailsComponent implements OnInit, OnDestroy {
  empBasicDetails = { id: null, name: '', isAdmin: false, email: '' };
  assignedpanel = false;
  addNew = false;
  employeeList = [];
  employeeAdditionalData: any = {
    assignedData: [],
    respondentData: []
  }
  employeeListData = [];

  subscribe: Subscription[] = [];

  constructor(private adminService: AdminService, formBuilder: FormBuilder,
    public _sn: SidenavRightPanelContentService, private snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.subscribe.push(this.adminService.EmployeeBasicDetails.subscribe(data => {
      this.empBasicDetails = data[0];
      if (this.empBasicDetails && this.empBasicDetails['id'] !== null) {
        this.fetchData(this.empBasicDetails['id']);
      }
    }))
    this.subscribe.push(this.adminService.EmployeeList.subscribe(data => {
      console.log('data in list', data)
      this.employeeListData = data;
      this.employeeList = data;
      // this.setEmployeeList();
    }))
  }

  ngOnDestroy() {
    this.subscribe.map(s => s.unsubscribe);
  }

  closePanel() {
    console.log('closePanel called')
    this._sn.panelClose$.next(false);
  }

  fetchData(id) {
    this.subscribe.push(this.adminService.getEmployeeAdditionalData(id).subscribe(data => {
      console.log('data', data)
      this.employeeAdditionalData = data;
      const temp = this.employeeListData;
      this.employeeList = temp;
      this.setEmployeeList();
    }))
  }

  updateBasic() {
    const obj = {
      name: this.empBasicDetails.name,
      email: this.empBasicDetails.email,
      isAdmin: this.empBasicDetails.isAdmin,
      id: this.empBasicDetails.id
    }

    this.adminService.updateBasicInfo(obj).subscribe(data => {
      this.openSnackBar("Employee Data Updated!!");
      this.fetchData(this.empBasicDetails['id']);
    }, error => {
      this.openSnackBar("Something went wrong!!");
    })
    
  }

  deleteAssigned(id) {
    console.log('called deleteAssigned', id)

    this.adminService.deleteAssignedFeedback(id).subscribe(data => {
      this.openSnackBar("Assigned feedback deleted succssfully!!");
      this.fetchData(this.empBasicDetails['id']);
      const temp = this.employeeListData;
      this.employeeList = temp;

    }, error => {
      this.openSnackBar("Something went wrong!!");
    })
  }

  setEmployeeList() {

    console.log('this.employeeListData', this.employeeListData)
    console.log('this.employeeList', this.employeeList)
    const employeeList = this.employeeListData;
    this.employeeList = employeeList;
    const employeeData = this.employeeAdditionalData.assignedData;
   

   
    for (let i = 0; i < employeeData.length; i++) {
      console.log(employeeData[i])
      const ind = _.findIndex(employeeList, function (item) { return item.id == employeeData[i]['assignedId'] });
      console.log('ind', ind)
      if(ind > -1){
        this.employeeList.splice(ind, 1);
      }
      
    }
    console.log('this.employeeList', this.employeeList)
    
  }

  assignNew(id) {
    console.log('id', id)

    const obj = {
      employeeId: this.empBasicDetails.id,
      assignedEmpId: []
    };
    obj['assignedEmpId'].push(id.toString());

    this.adminService.assignNewEmployee(obj).subscribe(data => {
      this.openSnackBar("New feedback assigned successfully!!");
      this.fetchData(this.empBasicDetails['id']);
    }, error => {
      this.openSnackBar("Something went wrong!!");
    })
  }

  updateContent(id) {
    const obj = {
      id: id,
      description: ''
    };
    const listData = this.employeeAdditionalData.respondentData;
    obj.description = listData.filter(item => { return item.id == id })[0]['respondentDescription'];

    this.subscribe.push(this.adminService.updateFeedback(obj).subscribe(data => {
      this.openSnackBar('Feedback saved successfully');
      this._sn.panelClose$.next(false);
    }, error => {
      this.openSnackBar('Something Went Wrong!!');
    }))
  }

  /**
   * Function to show toast message based on message and action 
   * @param message Text to show to user 
   * @param action button action if needed any
   */
  openSnackBar(message, action = '') {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }


}
