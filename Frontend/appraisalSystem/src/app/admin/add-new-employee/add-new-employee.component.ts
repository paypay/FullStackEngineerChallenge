import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { SidenavRightPanelContentService } from '../../common/services/side-nav-panel.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-add-new-employee',
  templateUrl: './add-new-employee.component.html',
  styleUrls: ['./add-new-employee.component.scss']
})
export class AddNewEmployeeComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  submitted = false;
  titleAlert: string = 'This field is required';
  assignedpanel = false;
  employeeListData = [];
  assignedEmployee = [];
  atleastOneSelected = false;
  subscribe: Subscription[] = [];
  
  constructor(public _sn: SidenavRightPanelContentService, private formBuilder: FormBuilder,
    private adminService: AdminService,  private snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({    
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.subscribe.push(this.adminService.EmployeeList.subscribe(data => {
      this.employeeListData = data;
      this.employeeListData.map(item => item['selected'] = false);
    }))
  }

  ngOnDestroy() {
    this.subscribe.map(s => s.unsubscribe);
  }

  // Get quick access to form on html
  get f() { return this.registerForm.controls; }

  
  /**
   * Function to close side panel on click of x icon at top
   */
  closeNav() {
    this._sn.panelClose$.next(false);
  }
  /**
   * Function to create new employee
   * @returns if form is invalid
   */
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    const obj = {
      name: this.registerForm.value.name,
      isAdmin: false,
      email: this.registerForm.value.email,
      feedbacks: []
    }
    const temp = this.employeeListData.filter(item => {return item['selected']})
    temp.map(item => {
      if(item.selected){
        const tobj = {
          assignedId: item.id,
          description: null
        }
        obj.feedbacks.push(tobj);
      }
    })

    this.subscribe.push(this.adminService.addNewEmployee(obj).subscribe(data => {
      this.openSnackBar("Employee Added Successfully!!");
      this._sn.panelClose$.next(false);      
    }, error => {
      this.openSnackBar("Something went wrong!!");
    }))
    
  }

  /**
   * Function to assign employee while creating new employee
   * @param item flag
   * 
   */
  updatedSelected(item){
    item['selected'] = ! item['selected'];
   const temp = this.employeeListData.filter(item => {return item['selected']})
   this.atleastOneSelected = temp.length > 0;
  }

  /**
   * Function to reset form on click of reset button
   */
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
    this.employeeListData.map(item => item['selected'] = false);
  }

  /**
   * Function to check type of error in email  
   * @returns message string
   */
  getErrorEmail() {
    return this.registerForm.get('email').hasError('required') ? 'Field is required' :
      this.registerForm.get('email').hasError('pattern') ? 'Not a valid emailaddress' : 'Enter Valid Email'
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
