import React from "react";
import { Link } from "react-router-dom";
import { Grid, Typography, Button } from "@material-ui/core";
import { home } from "../../common/routes/home";
import { NotFoundStyle } from "./NotFoundStyle";

export const NotFound = () => {
  const classes = NotFoundStyle();
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.grid}
    >
      <Grid item className={classes.zoom}>
        <Typography variant="h1">{"404"}</Typography>
      </Grid>
      <Grid item className={classes.zoom}>
        <Typography variant="h5">{"Page Not Found"}</Typography>
      </Grid>
      <Grid item className={classes.zoom}>
        <Link className={classes.link} to={home}>
          <Button className={classes.button} variant="outlined">
            {"Back"}
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};
