import { put, takeLatest } from "redux-saga/effects";
import {
  fetchFailed,
  fetchSuccess,
  getFeedBacks,
  addFeedback,
  saveFeedback,
} from "stores/slices/feedback";
import { doPost, doGet } from "utils/request";

const feedback = {
  *fetchFeedback() {
    try {
      const res = yield doGet("/feedbacks");
      yield put(fetchSuccess(res));
    } catch (err) {
      yield put(fetchFailed(err.message));
    }
  },
  *addFeedback({ payload: requestData }) {
    try {
      const res = yield doPost("/feedback", requestData);
      yield put(saveFeedback(res));
    } catch (err) {
      yield put(fetchFailed(err.message));
    }
  },
};
export function* sagas() {
  yield takeLatest(getFeedBacks, feedback.fetchFeedback);
  yield takeLatest(addFeedback, feedback.addFeedback);
}
