import React, { useEffect, useState } from "react";
import {
  FormControl,
  Input,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Grid,
  Button,
  Card,
  CardContent,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee } from "stores/slices/employee";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { ROUTES } from "utils/enums";

const useStyles = makeStyles({
  formControl: {
    width: "100%",
    margin: "0",
  },
  card: {
    padding: "10px",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
  },
  button: {
    width: "100%",
    margin: "10px",
  },
});

const AddEmployee = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reviewer, setReviewer] = useState(true);
  const { employee } = useSelector((state) => state.employeesReducer);

  useEffect(() => {
    if (employee) {
      history.push(ROUTES.DASHBOARD);
    }
  }, [employee]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addEmployee({ name, email, password, reviewer }));
  };
  return (
    <Grid container spacing={0} alignItems="center" justify="center">
      <Card>
        <CardContent>
          <h3> Add Employee</h3>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <FormControl
              className={classes.formControl}
              margin="dense"
              size="small"
            >
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input id="name" onChange={(evt) => setName(evt.target.value)} />
            </FormControl>
            <FormControl
              className={classes.formControl}
              margin="dense"
              size="small"
            >
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                onChange={(evt) => setEmail(evt.target.value)}
              />
            </FormControl>
            <FormControl
              className={classes.formControl}
              margin="dense"
              size="small"
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                type="password"
                onChange={(evt) => setPassword(evt.target.value)}
              />
            </FormControl>

            <FormControl
              className={classes.formControl}
              margin="dense"
              size="small"
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={reviewer}
                    name="reviewer"
                    color="primary"
                    onChange={() => setReviewer(!reviewer)}
                  />
                }
                label="Reviewer"
              />
            </FormControl>
            <div className={classes.buttonContainer}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                value="Submit"
                className={classes.button}
              >
                Submit
              </Button>

              <Button
                variant="outlined"
                color="primary"
                value="Close"
                onClick={() => history.push(ROUTES.DASHBOARD)}
                className={classes.button}
              >
                Close
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default AddEmployee;
