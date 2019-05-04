import React from 'react';
import "./DashboardStyle.css";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Fade from 'react-reveal/Fade'; 
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createBrowserHistory } from "history";

// import components used by this page
import BgPattern from '../../components/BgPattern';
// import CompanySearch from '../../components/CompanySearch';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { mainListItems, secondaryListItems } from '../../components/SideNavItems';
import Avatar from '@material-ui/core/Avatar';
import SimpleTable from '../../components/SimpleTable';

// This array of routes correspond to the content in the main display area contained by the nav components, which will be accessed by index position
const routes = [
  {
    path: "/dashboard/overview",
    main: () => <SimpleTable />
  },
  {
    path: "/dashboard/milestones",
    main: () => <h2>milestones</h2>
  },
  {
    path: "/dashboard/companies",
    main: () => <h1>Companies search goes here once it's updated to be a react component lol</h1>
  },
  {
    path: "/dashboard/progress",
    main: () => <h2>progress</h2>
  }
];

// Create history so that user can navigate back using their browser 
const customHistory = createBrowserHistory();

const drawerWidth = 200;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    maxHeight: 'inherit',
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    maxHeight: 65,
    backgroundColor: '#F7F4E9',
    color: 'black',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
    backgroundColor: '#FF5C62',
  },
  menuButtonHidden: {
    display: 'none',
    color: '#FF5C62',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    backgroundColor: '#F7F4E9',
    color: 'black',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    backgroundColor: '#F7F4E9',
    color: 'black',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
  avatar: {
    marginLeft: '35%',
    marginRight: '-35%',
  },
});


class Dashboard extends React.Component {
  // Initial state is set to open, and will be set to closed when the sidenav is collapsed
  state = {
    open: true,
  };

  // Handle opening side navigation bar...
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  // ...and handle closing it
  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    console.log(`Username: ${this.props.location.state.firstName} ${this.props.location.state.lastName}`)
    return (
    <Router history={customHistory}> 
      <div className={classes.root}>
        <CssBaseline />
        <BgPattern />
        <AppBar
          position='absolute'
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden,
              )}
            >
              <MenuIcon />
            </IconButton>
            <Avatar alt="avatar picture" src={this.props.location.state.pictureURL} className={classes.avatar}/>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Welcome back, <span className="userName">{this.props.location.state.firstName} {this.props.location.state.lastName}!</span>
            </Typography>
                <a className="logoutBtn" href="/">
                  <ExitToApp />
                </a>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon className={classes.chevronIcon}/>
            </IconButton>
          </div>

          <Fade left>
            <List>{mainListItems}</List>
            <Divider />
            <List>{secondaryListItems}</List>
          </Fade>

        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            ))}
        </main>
      </div>
    </Router>   
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
