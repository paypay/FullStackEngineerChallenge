import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-list-reviews',
  templateUrl: './list-reviews.component.html',
  styleUrls: ['./list-reviews.component.scss']
})
export class ListReviewsComponent implements OnInit {
  public reviewList: any;
  public serverErrors = '';
  public userData: any;
  public loginType: any;

  constructor(private _apiService: ApiService,
    public localStorageService:LocalStorageService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginType       =   this.localStorageService.get('logInType');
    this.userData        =   JSON.parse(localStorage.getItem('userLogin')); 
    console.log(this.userData);
    this.getReviewList();
  }
  getReviewList(): void {
    this.serverErrors = '';
    if (this.loginType==='admin') {
      this._apiService.getReviewList().subscribe(
        data => {
          console.log(data);
          if (data && data['data']) {
            this.reviewList = data['data'];
          }
        },
        err =>
          console.error(err)
      );
    } else {
      this._apiService.getReviewListId(this.userData.id).subscribe(
        data => {
          console.log(data);
          if (data && data['data']) {
            this.reviewList = data['data'];
          }
        },
        err =>
          console.error(err)
      );
    }
    
  }

}
