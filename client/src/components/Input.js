import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const initialState = {
  designation: "",
  firstName: "",
  lastName: "",
  email: "",
};

export default function FormPropsTextFields(props) {
  const [formState, setFormState] = useState(initialState);

  const onhandleSubmit = async () => {
      console.log(formState);
      const {firstname,lastname,designation,email} = formState
      if (
          !firstname ||
          !lastname ||
          !designation ||
          !email
          )
          return;
          const body = JSON.stringify({
            firstName:firstname,
            lastName: lastname,
            designation,
            email
          })
          const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body
            };
    console.log(requestOptions);
    const response = await fetch('http://localhost:8000/employee', requestOptions);
    const data = await response.json();
    console.log(data);
    console.log("We are here");
  };

  const setInput = (key, value) => {
    // console.log(key, value);
    setFormState({ ...formState, [key]: value });
  };
  const classes = useStyles();
  const defaultValue = ["Firstname", "Lastname", "Designation", "Email"];

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        {defaultValue.map((text, index) => (
          <TextField
            required
            id="outlined-required"
            label={text}
            defaultValue={text}
            variant="outlined"
            key={index}
            onChange={(event) =>
              setInput(text.toLowerCase(), event.target.value)
            }
          />
        ))}
        <Button variant="contained" color="primary" onClick={onhandleSubmit}>
          Submit
        </Button>
      </div>
    </form>
  );
}
