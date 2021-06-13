import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { SidenavRightPanelContentService } from 'src/app/common/services/side-nav-panel.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit, OnDestroy {
  feedbackData = {};
  selectedEmployeeName = '';
  selectedId = null;
  feedbackDescription = '';
  subscribe: Subscription[] = [];

  constructor(private empService: EmployeeService, public sn: SidenavRightPanelContentService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.subscribe.push(this.empService.selectedEmp.subscribe(data => {
      if(data && data.length > 0){
        this.fetchFeedback(data[0]['id']);
        this.selectedEmployeeName = data[0]['assignedName'];
        this.selectedId = data[0]['assignedId']
      }
    }))
  }
  /**
   * Hook called on component destroy inside which all subcscriber are destroyed
   */
  ngOnDestroy() {
    this.subscribe.map(s => s.unsubscribe);    
  }

  /**
   * Method to fetch feedback of assignee employee
   * @param id Feedback Id
   */
  fetchFeedback(id) {
    this.subscribe.push(this.empService.fetchFeedback(id).subscribe(data => {
      this.feedbackData = data;
      this.feedbackDescription = data['description'];  
    }, error => {
      this.openSnackBar('Something Went Wrong!!');
    }));
  }

  /**
   * Function to save updated feedback
   * Once saved panel will be closed and toast message will be displayed
   */
  UpdateFeedback() {
    const obj = {
      id: this.feedbackData['id'],
      description: this.feedbackDescription
    }

    this.subscribe.push(this.empService.updateFeedback(obj).subscribe(data => {
      this.openSnackBar('Feedback saved successfully');
      this.sn.panelClose$.next(false);  
    }, error => {
      this.openSnackBar('Something Went Wrong!!');
    }))
  }
  /**
   * Function to close side panel
   */
  closeNav() {    
    this.sn.panelClose$.next(false);    
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
