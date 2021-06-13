import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { SidenavRightPanelContentService } from 'src/app/common/services/side-nav-panel.service';
import { AuthenticateService } from '../../authenticate.service';
import { EmployeeService } from '../employee.service';
import { FeedbackComponent } from '../feedback/feedback.component';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, AfterViewInit {
  employeeData: any = [];
  displayedColumns: string[] = ['empId', 'name', 'action'];
  dataSource: any = new MatTableDataSource();
  rightSideNav: MatSidenav;
  rightSideComponent$;
  _destroy$ = new Subject<void>();

  @ViewChild(MatSidenavContainer) snc: MatSidenavContainer;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private authenticateService: AuthenticateService, private empService: EmployeeService,
    public sn: SidenavRightPanelContentService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.authenticateService.userData.subscribe(data => {
      if (data) {
        this.fetchData(data['id']);
      }
    })

    this.rightSideComponent$ = this.sn.getComponentPortal$().pipe(
      tap((_) => _ ? this.rightSideNav.open() : null),
      takeUntil(this._destroy$)
    );
    this.sn.panelClose$.subscribe(data => {
      console.log('data', data)
      // if(data== false && this.rightSideNav){
      //   this.rightSideNav.close();
      //   this.adminService.EmployeeBasicDetails.next([]);
      // }
    })

  }

  /**
   * Setting/initializing table and panel 
   */
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.rightSideNav = this.snc.end as MatSidenav;
  }
  /**
   * Fetching list of assigned feedback for logged in employee
   * @param id Emp Id of logged in employee
   */
  fetchData(id) {
    this.empService.fetchEmployeeData(id).subscribe(data => {
      this.employeeData = data;
      this.dataSource['data'] = data;
    }, error => {
      this.openSnackBar('Something Went Wrong!!');
    })

  }

  /**
   * Method to open the selected employee feedback in panel
   * @param id selected employee id
   */
  ViewEmployeeData(id) {
    const empData = this.dataSource.data.filter(item => item.id == id);

    this.empService.selectedEmp.next(empData);
    this.sn.setComponentPortal(FeedbackComponent);
  }

  /**
   * Method to show toast message based on message and action
   * @param message 
   * @param action 
   */
  openSnackBar(message, action = '') {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }
}
