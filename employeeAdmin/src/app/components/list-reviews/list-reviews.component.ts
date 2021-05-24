import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-reviews',
  templateUrl: './list-reviews.component.html',
  styleUrls: ['./list-reviews.component.scss']
})
export class ListReviewsComponent implements OnInit {
  public reviewList: any;
  public serverErrors = '';

  constructor(private _apiService: ApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.getReviewList();
  }
  getReviewList(): void {
    this.serverErrors = '';
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
  }
}
