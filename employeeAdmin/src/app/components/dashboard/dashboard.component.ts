import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public userData: any;
  constructor() { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userLogin'));
  }

}
