import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeReviewComponent } from './take-review.component';

describe('TakeReviewComponent', () => {
  let component: TakeReviewComponent;
  let fixture: ComponentFixture<TakeReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
