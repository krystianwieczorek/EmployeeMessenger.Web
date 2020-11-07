import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { RegisterPageStyles } from "./RegisterPageStyles";
import { registerClient } from "../../api/registerClient";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { login } from "../../common/routes/login";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#e3e3e3",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#794c74",
    },
    "& .MuiInputBase-input": {
      color: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#794c74",
      },
      "&:hover fieldset": {
        borderColor: "#e3e3e3",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#794c74",
      },
    },
  },
})(TextField);

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText("#794c74"),
    backgroundColor: "#794c74",
    "&:hover": {
      backgroundColor: "#794c74",
    },
  },
}))(Button);

export const RegisterPage = () => {
  const { register, handleSubmit, errors } = useForm();
  const classes = RegisterPageStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const onSubmit = (data) => {
    registerClient(data)
      .then((response) => {
        console.log(response);
        history.push(login);
      })
      .catch(() => {
        setOpen(true);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert severity="error">Something went wrong</Alert>
      </Snackbar>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VpnKeyIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CssTextField
            error={!!errors.email}
            InputLabelProps={{
              className: classes.floatingLabelFocusStyle,
            }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="FirstName"
            label="First Name"
            name="firstName"
            autoFocus
            inputRef={register({ required: true })}
            helperText={errors.password && "First Name is requierd"}
          />
          <CssTextField
            error={!!errors.email}
            InputLabelProps={{
              className: classes.floatingLabelFocusStyle,
            }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="lastName"
            label="Last Name"
            type="LastName"
            id="LastName"
            inputRef={register({ required: true })}
            helperText={errors.password && "Last Name is requierd"}
          />
          <CssTextField
            error={!!errors.email}
            InputLabelProps={{
              className: classes.floatingLabelFocusStyle,
            }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            type="email"
            id="email"
            inputRef={register({ required: true, pattern: /^\S+@\S+\.\S+$/ })}
            helperText={errors.password && "Valid email adress is requierd"}
          />
          <CssTextField
            error={!!errors.email}
            InputLabelProps={{
              className: classes.floatingLabelFocusStyle,
            }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            inputRef={register({ required: true })}
            helperText={errors.password && "Valid password is requierd"}
          />
          <CssTextField
            error={!!errors.email}
            id="date"
            name="birthDate"
            label="Birth Date"
            type="date"
            variant="outlined"
            margin="normal"
            fullWidth
            defaultValue="2017-05-24"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
              className: classes.datePicker,
            }}
            inputRef={register}
          />

          <ColorButton
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={handleSubmit(onSubmit)}
          >
            Sign Up
          </ColorButton>
        </form>
      </div>
    </Container>
  );
};
