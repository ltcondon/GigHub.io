import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AccountBox from '@material-ui/icons/AccountBox';
import PlaylistAddCheckTwoTone from '@material-ui/icons/PlaylistAddCheckTwoTone';
import Domain from '@material-ui/icons/Domain';
import BarChartIcon from '@material-ui/icons/BarChart';
import Note from '@material-ui/icons/Note';


// The following list items populate the side nav on the dashboard page and link to the components to be displayed in the main content area of the dashboard
export const mainListItems = (
  <div>
    <Link to='/dashboard/overview' style={{ textDecoration: 'none' }}>
      <ListItem button id='overviewBtn' className='listBtn'>
        <ListItemIcon className='listIcon'>
          <AccountBox />
        </ListItemIcon>
        <ListItemText primary='Overview' className='listTxt' />
      </ListItem>
    </Link>

    <Link to='/dashboard/milestones' style={{ textDecoration: 'none' }}>
      <ListItem button id='milestonesBtn' className='listBtn'>
        <ListItemIcon className='listIcon'>
          <PlaylistAddCheckTwoTone />
        </ListItemIcon>
        <ListItemText primary='My Jobs' className='listTxt' />
      </ListItem>
    </Link>

    <Link to='/dashboard/companies' style={{ textDecoration: 'none' }}>
      <ListItem button id='companiesBtn' className='listBtn'>
        <ListItemIcon className='listIcon'>
          <Domain />
        </ListItemIcon>
        <ListItemText primary='Companies' className='listTxt' />
      </ListItem>
    </Link>

    <Link to='/dashboard/progress' style={{ textDecoration: 'none' }}>
      <ListItem button id='progressBtn' className='listBtn'>
        <ListItemIcon className='listIcon'>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary='Analytics' className='listTxt' />
      </ListItem>
    </Link>
  </div>
);

// Secondary list items are currently a stand-in for a to-do's/notes sections on the side nav
export const secondaryListItems = (
  <div>
    <ListSubheader inset>To-Do's</ListSubheader>

    <ListItem button className='listBtn'>
      <ListItemIcon className='listIcon'>
        <Note />
      </ListItemIcon>
      <ListItemText primary='Find job' />
    </ListItem>

    <ListItem button className='listBtn'>
      <ListItemIcon className='listIcon'>
        <Note />
      </ListItemIcon>
      <ListItemText primary='Interview' />
    </ListItem>

    <ListItem button className='listBtn'>
      <ListItemIcon className='listIcon'>
        <Note />
      </ListItemIcon>
      <ListItemText primary='Land job' />
    </ListItem>
  </div>
);