import React, { Fragment, useState } from "react";
import {
  Grid,
  Typography,
  Divider,
  Card,
  Button,
  InputLabel,
  Input,
  FormControl,
  CardContent,
} from "@material-ui/core";

const FeedbackCard = ({ feedBackList, employee, saveFeedback, isReviewer }) => {
  const [addFeedback, setAddFeedback] = useState(false);
  const [text, setText] = useState("");
  const { name, _id } = employee;
  const addFeedbackHandler = () => {
    if (addFeedback) saveFeedback({ _id, text });
    setAddFeedback(!addFeedback);
  };

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h6">
          {name}
        </Typography>
        {feedBackList?.length &&
          feedBackList
            .filter((feedback) => _id === feedback.employeeId)
            .map((feedback) => {
              return (
                <Fragment key={feedback._id}>
                  <Grid container alignItems="center">
                    <Grid item xs>
                      <Typography color="textSecondary" variant="body1">
                        {feedback.comments.text}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography gutterBottom variant="caption">
                        {feedback.comments.name}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider />
                </Fragment>
              );
            })}
        {addFeedback && (
          <form>
            <FormControl>
              <InputLabel htmlFor="text">Add Feedback</InputLabel>
              <Input id="test" onChange={(evt) => setText(evt.target.value)} />
            </FormControl>
          </form>
        )}
        {isReviewer && (
          <Button color="primary" onClick={addFeedbackHandler}>
            {addFeedback ? "Save" : "add Feedback"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default FeedbackCard;
