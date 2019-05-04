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
    <ListItem button id='overview' className='listBtn'>
      <ListItemIcon className='listIcon'>
        <AccountBox />
      </ListItemIcon>
      <ListItemText primary='Overview' />
    </ListItem>
    <ListItem button id='milestones' className='listBtn'>
      <ListItemIcon className='listIcon'>
        <PlaylistAddCheckTwoTone />
      </ListItemIcon>
      <ListItemText primary='Milestones' />
    </ListItem>
    <ListItem button id='companySearch' className='listBtn'>
      <ListItemIcon className='listIcon'>
        <Domain />
      </ListItemIcon>
      <ListItemText primary='Company Search' />
    </ListItem>
    <ListItem button id='progressTracker' className='listBtn'>
      <ListItemIcon className='listIcon'>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary='Progress Tracker' />
    </ListItem>
  </div>
);

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