import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
  },
  root: {
    width: "100%",
    backgroundColor: "#525252",
    color: "white",
    border: "solid",
    borderColor: "#794c74",
    borderRadius: 20,
  },
  inline: {
    display: "inline",
    color: "white",
    fontSize: "20px",
    fontWeight: "bold",
  },
  name: {
    display: "inline",
    color: "#b3b3b3",
    fontSize: "30px",
    fontWeight: "bold",
  },
}));

export const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <List className={classes.root}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography
                component="span"
                variant="body2"
                className={classes.name}
              >
                Jan Nowak
              </Typography>
            }
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                >
                  I'll be in your neighborhood doing errands this…
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider
          variant="middle"
          component="li"
          style={{ backgroundColor: "#794c74" }}
        />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography
                component="span"
                variant="body2"
                className={classes.name}
              >
                Jan Nowak
              </Typography>
            }
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                >
                  I'll be in your neighborhood doing errands this…
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider
          variant="middle"
          component="li"
          className={classes.Divider}
          style={{ backgroundColor: "#794c74" }}
        />
        <ListItem alignItems="flex-start" style={{ textAlign: "end" }}>
          <ListItemText
            primary={
              <Typography
                component="span"
                variant="body2"
                className={classes.name}
              >
                Jan Nowak
              </Typography>
            }
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                >
                  I'll be in your neighborhood doing errands this…
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    </div>
  );
};
