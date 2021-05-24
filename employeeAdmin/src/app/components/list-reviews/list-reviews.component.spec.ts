import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReviewsComponent } from './list-reviews.component';

describe('ListReviewsComponent', () => {
  let component: ListReviewsComponent;
  let fixture: ComponentFixture<ListReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
