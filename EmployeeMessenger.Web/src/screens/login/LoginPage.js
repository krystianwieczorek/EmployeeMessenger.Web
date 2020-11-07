import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { LoginPageStyles } from "./LoginPageStyles";
import { authClient } from "../../api/authClient";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { home } from "../../common/routes/home";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { registerPage } from "../../common/routes/registerPage";
import { pageRefresher } from "../../helpers/pageRefresher";

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

export const LoginPage = () => {
  const { register, handleSubmit, errors } = useForm();
  const classes = LoginPageStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const onSubmit = (data) => {
    authClient(data)
      .then((response) => {
        console.log(response);
        history.push(home);
        pageRefresher();
      })
      .catch(() => setOpen(true));
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
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
        <Alert severity="error">Username or password is incorect!</Alert>
      </Snackbar>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
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
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={register({ required: true, pattern: /^\S+@\S+\.\S+$/ })}
            helperText={errors.password && "Valid email adress is requierd"}
          />
          <CssTextField
            error={!!errors.password}
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
            autoComplete="current-password"
            inputRef={register({ required: true })}
            helperText={errors.password && "Password is requierd"}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <ColorButton
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={handleSubmit(onSubmit)}
          >
            Sign In
          </ColorButton>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item>
              <Link
                to={registerPage}
                variant="body2"
                style={{ color: "white" }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
