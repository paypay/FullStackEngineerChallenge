import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  Input,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Button,
  Card,
  CardContent,
} from "@material-ui/core";
import { updateEmployee, deleteEmployee } from "stores/slices/employee";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  card: {
    minWidth: "150px",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
  },
  button: {
    width: "100%",
    margin: "2px",
  },
}));
const EmployeeCard = ({ employee, setFetchList }) => {
  const classes = useStyles();
  const emp = { ...employee };
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(emp.name);
  const [email, setEmail] = useState(emp.email);
  const [reviewer, setReviewer] = useState(emp.reviewer);
  const dispatch = useDispatch();

  const editHandler = () => {
    const copyEmployee = { ...employee };
    if (edit) {
      setName(copyEmployee.name);
      setEmail(copyEmployee.email);
      setReviewer(copyEmployee.reviewer);
    }
    setEdit(!edit);
    setFetchList(true);
  };

  const updateEmployeeDetails = () => {
    const { _id } = { ...employee };
    dispatch(updateEmployee({ employeeId: _id, name, email, reviewer }));
    setEdit(!edit);
    setFetchList(true);
  };

  const deleteEmployeeHandler = () => {
    const { _id } = { ...employee };
    dispatch(deleteEmployee({ employeeId: _id }));
    setFetchList(true);
  };

  return (
    <Card key={emp._id} className={classes.card}>
      <CardContent>
        {!edit ? (
          <>
            <h5>{name}</h5>
            <p>{email}</p>
            <p>{`Reviewer ${reviewer}`}</p>
          </>
        ) : (
          <form>
            <FormControl>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                id="name"
                value={name}
                onChange={(evt) => setName(evt.target.value)}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}
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
          </form>
        )}
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={editHandler}
          >
            {edit ? "cancel" : "edit"}
          </Button>

          <Button
            variant="outlined"
            color="primary"
            disabled={!edit}
            onClick={updateEmployeeDetails}
            className={classes.button}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={deleteEmployeeHandler}
            className={classes.button}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;
