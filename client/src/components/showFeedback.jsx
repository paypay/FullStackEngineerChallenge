import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getFeedBacks, addFeedback } from "stores/slices/feedback";
import { getEmployees } from "stores/slices/employee";
import FeedbackCard from "./feedbackCard";

const ShowFeedback = () => {
  const dispatch = useDispatch();
  const { feedbackReducer, employeesReducer, loginReducer } = useSelector(
    (state) => state
  );
  const { feedBackList, feedback } = feedbackReducer;
  const { employeeList } = employeesReducer;
  const { employeeId, userName, reviewer } = loginReducer;
  useEffect(() => {
    dispatch(getEmployees());
    if (!feedBackList) {
      dispatch(getFeedBacks());
    }
  }, []);

  useEffect(() => {
    if (feedback) dispatch(getFeedBacks());
  }, [feedback]);

  const save = ({ _id, text }) => {
    dispatch(
      addFeedback({ employeeId: _id, comments: { text, name: userName } })
    );
  };

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      alignItems="center"
      justify="center"
    >
      {!!employeeList?.length &&
        employeeList.map((employee) => {
          const { _id } = employee;
          return (
            employeeId !== employee._id && (
              <Grid item xs={4} key={_id}>
                <FeedbackCard
                  feedBackList={feedBackList}
                  employee={employee}
                  saveFeedback={save}
                  isReviewer={reviewer}
                />
              </Grid>
            )
          );
        })}
    </Grid>
  );
};

export default ShowFeedback;
