import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useTheme, withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Button from "@material-ui/core/Button";
import { LayoutStyles } from "./LayoutStyles";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { NotFound } from "../notFound/NotFound";
import { Home } from "../home/Home";
import { LoginPage } from "../login/LoginPage";
import { RegisterPage } from "../register/RegisterPage";
import { home } from "../../common/routes/home";
import { login } from "../../common/routes/login";
import { addNewWorkspace } from "../../common/routes/addNewWorkspace";
import { addNewChannel } from "../../common/routes/addNewChannel";
import { registerPage } from "../../common/routes/registerPage";
import { pageRefresher } from "../../helpers/pageRefresher";
import { loggedUserDetails } from "../../api/loggedUserDetails";
import { useDispatch } from "react-redux";
import { loggedUserAction } from "../../store/actions/loggedUserAction";
import { AddNewWorkspace } from "../workspace/AddNewWorkspace";
import { AddNewChannel } from "../channel/AddNewChannel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import AddIcon from "@material-ui/icons/Add";
import Avatar from "@material-ui/core/Avatar";
import { getWorkspaces } from "../../api/getWorkspaces";

export const Layout = () => {
  const classes = LayoutStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState(0);
  const [workspaces, setWorkspaces] = useState();
  const [channels, setChannels] = useState();
  const [selectedChannel, setSelectedChannel] = useState(0);
  const [loggedUser, setLoggedUser] = useState(undefined);
  const [isAuthUser, setAuthUser] = useState(false);
  const [openList, setOpenList] = React.useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getWorkspaces().then((response) => {
      setWorkspaces(response.data);
      setChannels(response.data[0].channels);
    });
  }, []);

  // useEffect(() => {
  //   if (localStorage.getItem("token") != null) {
  //     setAuthUser(true);
  //     loggedUserDetails().then((response) => {
  //       setLoggedUser(response.data.firstName);
  //       dispatch(loggedUserAction(response.data));
  //     });
  //   }
  // }, [isAuthUser, dispatch]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClose = () => {
    setOpenList(false);
  };

  const handleOpen = () => {
    setOpenList(true);
  };

  const handleListItemOrganizationClick = (event, index) => {
    setSelectedOrganization(index);
  };
  const handleListItemChannelClick = (event, index) => {
    setSelectedChannel(index);
  };

  const CssListItem = withStyles({
    root: {
      "&.MuiListItem-root.Mui-selected": {
        backgroundColor: "#794c74",
      },
      "&:hover": {
        backgroundColor: "#313131",
      },
      "&:hover.MuiListItem-root.Mui-selected": {
        backgroundColor: "#5c4358",
      },
    },
  })(ListItem);

  const CssIconButton = withStyles({
    root: {
      color: "white",
      "&:hover": {
        backgroundColor: "#313131",
      },
    },
  })(IconButton);

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap style={{ flexGrow: 1 }}>
              <Link
                style={{ textDecoration: "none", color: "#e3e3e3" }}
                to={home}
              >
                Employee Messenger
              </Link>
            </Typography>

            {isAuthUser === true ? (
              <>
                {loggedUser !== undefined && loggedUser}
                <FormControl className={classes.formControl}>
                  <Select
                    disableUnderline={true}
                    open={openList}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    style={{ textDecoration: "none " }}
                  >
                    <MenuItem>
                      <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to={login}
                      >
                        <Button
                          className={classes.signOutButton}
                          onClick={() => {
                            setAuthUser(false);
                            localStorage.clear();
                            pageRefresher();
                          }}
                        >
                          Logout
                        </Button>
                      </Link>
                    </MenuItem>
                  </Select>
                </FormControl>
              </>
            ) : (
              <Link
                style={{ textDecoration: "none", color: "#e3e3e3" }}
                to={login}
              >
                <Button className={classes.signInButton}>Login</Button>
              </Link>
            )}
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <CssIconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </CssIconButton>
          </div>
          <Divider />
          <List>
            <Typography
              variant="h6"
              gutterBottom
              // style={{ textAlign: "center" }}
              style={{ marginLeft: "18px" }}
            >
              Organizations
            </Typography>

            {workspaces?.map((item, index) => (
              <CssListItem
                button
                key={index}
                selected={selectedOrganization === index}
                onClick={(event) => {
                  setChannels(item.channels);
                  handleListItemOrganizationClick(event, index);
                }}
              >
                <ListItemIcon style={{ color: "white" }}>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </CssListItem>
            ))}
            <CssListItem button>
              <ListItemIcon style={{ color: "red" }}>
                <Avatar
                  style={{
                    backgroundColor: theme.palette.secondary.main,
                    zoom: 0.6,
                  }}
                >
                  <AddIcon />
                </Avatar>
              </ListItemIcon>
              <Link className={classes.linkNoStyles} to={addNewWorkspace}>
                Add New Workspace
              </Link>
            </CssListItem>
          </List>
          <Divider />
          <List>
            <Typography
              variant="h6"
              gutterBottom
              // style={{ textAlign: "center" }}
              style={{ marginLeft: "18px" }}
            >
              Channels
            </Typography>
            {channels?.map((item, index) => (
              <CssListItem
                button
                key={index}
                selected={selectedChannel === index}
                onClick={(event) => handleListItemChannelClick(event, index)}
              >
                <ListItemIcon style={{ color: "white" }}>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </CssListItem>
            ))}
            <CssListItem button>
              <ListItemIcon style={{ color: "red" }}>
                <Avatar
                  style={{
                    backgroundColor: theme.palette.secondary.main,
                    zoom: 0.6,
                  }}
                >
                  <AddIcon />
                </Avatar>
              </ListItemIcon>
              <Link className={classes.linkNoStyles} to={addNewChannel}>
                Add New Channel
              </Link>
            </CssListItem>
          </List>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <Switch>
            <Route exact path={home} component={Home} />
            <Route path={login} component={LoginPage} />
            <Route path={addNewWorkspace} component={AddNewWorkspace} />
            <Route path={addNewChannel} component={AddNewChannel} />
            <Route path={registerPage} component={RegisterPage} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};
