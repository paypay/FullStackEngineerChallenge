export interface StaffInfo {
  name: string;
  email: string;
  type: string;
  reviewers: string[];
  reviews: string;
}

export interface ReviewInfo {
  name: string;
  email: string;
  reviews: ReviewDetail[];
}

export interface ReviewDetail {
  reviewer: string;
  score: number;
  reviews: string;
}

export interface LoginInput {
  account: string;
  password: string;
}

export interface StaffResponse {
  id: number;
  name: string;
  email: string;
  team: string;
  type: string;
}

export interface ReviewResponse {
  id: number;
  name: string;
  reviews: ReviewDetail[];
  reviewers: string[];
  toReview: string[];
}

export interface SideNav {
  title: string;
  icon: [string, string];
}

export interface UpdateReviewInput {
  name: string;
  reviews: ReviewDetail[];
}
