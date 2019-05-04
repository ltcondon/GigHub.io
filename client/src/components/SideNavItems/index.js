import React from 'react';
import './style.css';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AccountBox from '@material-ui/icons/AccountBox';
import PlaylistAddCheckTwoTone from '@material-ui/icons/PlaylistAddCheckTwoTone';
import Domain from '@material-ui/icons/Domain';
import BarChartIcon from '@material-ui/icons/BarChart';
import Note from '@material-ui/icons/Note';


// The following list items populate the side nav on the dashboard page
export const mainListItems = (
  <div>
    <ListItem button id='overviewBtn' className='listBtn'>
      <ListItemIcon className='listIcon'>
        <AccountBox />
      </ListItemIcon>
      <ListItemText primary='Overview' className='listTxt' />
    </ListItem>
    <ListItem button id='milestonesBtn' className='listBtn'>
      <ListItemIcon className='listIcon'>
        <PlaylistAddCheckTwoTone />
      </ListItemIcon>
      <ListItemText primary='Milestones' className='listTxt' />
    </ListItem>
    <ListItem button id='companiesBtn' className='listBtn'>
      <ListItemIcon className='listIcon'>
        <Domain />
      </ListItemIcon>
      <ListItemText primary='Companies' className='listTxt' />
    </ListItem>
    <ListItem button id='progressBtn' className='listBtn'>
      <ListItemIcon className='listIcon'>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary='Progress' className='listTxt' />
    </ListItem>
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