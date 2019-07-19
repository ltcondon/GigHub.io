import React from 'react';
import "./DashboardStyle.css";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Fade from 'react-reveal/Fade'; 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

// import components used by this page
import AnalyticsCharts from '../../components/AnalyticsCharts';
import UserOverview from '../../components/UserOverview';
import BgPattern from '../../components/BgPattern';
import Contacts from '../../components/Contacts';
import CompanySearch from '../../components/CompanySearch';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToApp from '@material-ui/icons/ExitToApp';
import SideNavItems from '../../components/SideNavItems';
import Avatar from '@material-ui/core/Avatar';
import MyJobs from '../../components/MyJobs';

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


class Dashboard extends React.PureComponent {
  // Initial state is set to open, and will be set to closed when the sidenav is collapsed
  state = {
    open: true,
  };

  // Grab and store user ID info from Login page
  componentDidMount() {
    this.setState({...this.props.location.state})
  }

  componentDidUpdate (prevProps) {
    if (this.props.location.state.id !== prevProps.location.state.id) {
      this.setState({...this.props.location.state});
    }
  };

  // Handle opening side navigation bar...
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  // ...and handle closing it
  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  addJob = () => {
    this.setState({ jobClicked: true });
  };

  render() {

    // Redirects to Log-In if no username is found
    if (!this.props.location.state) {
      return <Redirect to={{
        pathname: '/'
      }}  
      />
    }

    const { classes } = this.props;

    return (
    <Router> 
      <div className={classes.root}>

        <CssBaseline />
        <BgPattern />

        <AppBar position='absolute' className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>

          <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
        
          <IconButton color="inherit" aria-label="Open drawer" onClick={this.handleDrawerOpen} className={classNames(classes.menuButton, this.state.open && classes.menuButtonHidden)}>
            <MenuIcon />
          </IconButton>
        
          <Avatar alt="avatar picture" src={this.state.pictureURL} className={classes.avatar} id="avatar"/>
        
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Welcome back, <span className="userName">{this.state.firstName} {this.state.lastName}!</span>
          </Typography>

          {/* <Row className="justify-content-center">
            <Col size="sm-12 m-6">
              <Avatar alt="avatar picture" src={this.state.pictureURL} className={classes.avatar} id="avatar"/>            
            </Col>
            <Col size="sm-12 m-6">
              <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Welcome back, <span className="userName">{this.state.firstName} {this.state.lastName}!</span>
            </Typography>
            </Col>
          </Row> */}
            
          <a className="logoutBtn" href="/">
            <ExitToApp />
          </a>

        </Toolbar>

        </AppBar>

        <Drawer variant="permanent" classes={{paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),}} open={this.state.open}>
          <div className={classes.toolbarIcon}>
            <img src="/img/gighub-logo.png" alt="GigHub logo" className="drawer-logo" />
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon className={classes.chevronIcon}/>
            </IconButton>
          </div>

          <Fade left>
            <SideNavItems state={{id: this.state.id, firstName: this.state.firstName, lastName: this.state.lastName, pictureURL: this.state.pictureURL, isAuthorized: this.state.isAuthorized}}/>
          </Fade>

        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
            <Switch>
              <Route path="/dashboard" render={(props) => <UserOverview {...props} state={{id: this.state.id, firstName: this.state.firstName, lastName: this.state.lastName, pictureURL: this.state.pictureURL, isAuthorized: this.state.isAuthorized}}/>}/>
              {/* <Route path="/overview" render={(props) => <UserOverview {...props} state={{id: this.state.id, firstName: this.state.firstName, lastName: this.state.lastName, pictureURL: this.state.pictureURL, isAuthorized: this.state.isAuthorized}}/>}/> */}
              <Route path="/myJobs" render={(props) => <MyJobs {...props} state={{id: this.state.id, firstName: this.state.firstName, lastName: this.state.lastName, pictureURL: this.state.pictureURL, isAuthorized: this.state.isAuthorized}}/>}/>
              <Route path="/contacts" render={(props) => <Contacts {...props} state={{id: this.state.id, firstName: this.state.firstName, lastName: this.state.lastName, pictureURL: this.state.pictureURL, isAuthorized: this.state.isAuthorized}}/>}/>
              <Route path="/companies" render={(props) => <CompanySearch {...props} state={{id: this.state.id, firstName: this.state.firstName, lastName: this.state.lastName, pictureURL: this.state.pictureURL, isAuthorized: this.state.isAuthorized}}/>}/>
              <Route path="/analytics" render={(props) => <AnalyticsCharts {...props} state={{id: this.state.id, firstName: this.state.firstName, lastName: this.state.lastName, pictureURL: this.state.pictureURL, isAuthorized: this.state.isAuthorized}}/>}/>
              <Route render={(props) => <UserOverview {...props} state={{id: this.state.id, firstName: this.state.firstName, lastName: this.state.lastName, pictureURL: this.state.pictureURL, isAuthorized: this.state.isAuthorized}}/>} />
            </Switch>
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