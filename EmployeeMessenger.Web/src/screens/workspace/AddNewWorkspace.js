import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import WorkIcon from "@material-ui/icons/Work";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { AddNewWorkspaceStyles } from "./AddNewWorkspaceStyles";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { newWorkspace } from "../../api/newWorkspace";
import { home } from "../../common/routes/home";

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

export const AddNewWorkspace = () => {
  const { register, handleSubmit, errors } = useForm();
  const classes = AddNewWorkspaceStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const onSubmit = (data) => {
    newWorkspace(data)
      .then((response) => {
        console.log(response);
        history.push(home);
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
          <WorkIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add new workspace
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CssTextField
            error={!!errors.Workspace}
            InputLabelProps={{
              className: classes.floatingLabelFocusStyle,
            }}
            variant="outlined"
            margin="normal"
            fullWidth
            name="name"
            label="Workspace Name"
            type="name"
            id="name"
            inputRef={register({ required: true })}
            helperText={errors.Workspace && "Valid workspace name is requierd"}
          />

          <ColorButton
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={handleSubmit(onSubmit)}
          >
            Register
          </ColorButton>
        </form>
      </div>
    </Container>
  );
};
