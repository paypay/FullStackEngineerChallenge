import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { SidenavRightPanelContentService } from '../../common/services/side-nav-panel.service';
import { AdminService } from '../admin.service';
import { map, takeUntil, tap } from "rxjs/operators";
import { ViewEmployeeDetailsComponent } from '../view-employee-details/view-employee-details.component';
import { AddNewEmployeeComponent } from '../add-new-employee/add-new-employee.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['empId', 'name', 'email', 'action'];
  dataSource: any = new MatTableDataSource();
  employeeList: any = [];
  private _rightSideNav: MatSidenav;
  _rightSideComponent$;
  _destroy$ = new Subject<void>();

  
  @ViewChild(MatSidenavContainer) _snc: MatSidenavContainer;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private adminService: AdminService, public _sn: SidenavRightPanelContentService,
     private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.fetchData();
    this._rightSideComponent$ = this._sn.getComponentPortal$().pipe(
      tap((_) => _ ? this._rightSideNav.open() : null),
      takeUntil(this._destroy$)
    );
    this._sn.panelClose$.subscribe(data => {
      console.log('data', data)
      this.fetchData();
      if(data== false && this._rightSideNav){
        this._rightSideNav.close();
      //  this.fetchData();
       //  this.adminService.EmployeeBasicDetails.next([]);
      }
    })
  
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this._rightSideNav = this._snc.end as MatSidenav;
  }
  
  fetchData() {
    this.adminService.fetchEmployee().subscribe(data => {
      console.log('emp data', data);
      this.dataSource['data'] = data;
      this.adminService.EmployeeList.next(data);
    })
  }
  _loadComponent1() {
    this._sn.setComponentPortal(ViewEmployeeDetailsComponent);
  }

  /**
   * Function to open panel for creating new employee
   */
  addNewEmployee() {
    this._sn.setComponentPortal(AddNewEmployeeComponent);
  }

  ViewEmployeeData(id) {
    console.log('id', id);
    const empData = this.dataSource.data.filter(item => item.id == id);
    console.log('empData', empData)
    this.adminService.EmployeeBasicDetails.next(empData);
    this._sn.setComponentPortal(ViewEmployeeDetailsComponent);
  }

  /**
   * Function to delete employee
   * @param id employee id
   */
  deleteEmployee(id){
    this.adminService.deleteEmployee(id).subscribe(data => {
      this.openSnackBar("Employee Deleted Successfully!!");
    }, error => {
      this.openSnackBar("Something went wrong!!");
    })
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
