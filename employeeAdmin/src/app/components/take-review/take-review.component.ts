import { Component, OnInit, TemplateRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LocalStorageService } from 'angular-2-local-storage';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-take-review',
  templateUrl: './take-review.component.html',
  styleUrls: ['./take-review.component.scss']
})
export class TakeReviewComponent implements OnInit {
  modalRef: BsModalRef;
  public displayName: any;
  public fromId = null;
  public id = null;
  public reviewList: any;
  public serverErrors = '';
  public userData: any;
  public loginType: any;

  constructor(private _apiService: ApiService,
    public localStorageService: LocalStorageService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userLogin'));
    this.getForReviewList();
  }
  getForReviewList(): void {
    this.serverErrors = '';

    this._apiService.getForReviewListId(this.userData.id).subscribe(
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
  reviewModal(template: TemplateRef<any>, review) {
    console.log(review);
    this.displayName  = review.userdisplay;
    this.id = review.userid;
    this.fromId = review.fromUserId;
    this.modalRef = this.modalService.show(template);
  }
  reviewSubmit(ReviewerForm, rating) {
    let params = {
      id: this.id,
      fromId: this.fromId,
      comment: ReviewerForm.value.comment,
      review: rating
    }
    this._apiService.addReview(params).subscribe(
      data => {
        console.log(data);
        if (data && data['status'] === 1) {
          this.modalRef.hide();
          this.showSuccess('Review submitted');
          this.router.navigateByUrl('/dashboard');
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
