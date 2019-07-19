import React from 'react';
import './style.css';
import { NavLink } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import ListSubheader from '@material-ui/core/ListSubheader';
// import Divider from '@material-ui/core/Divider';
import AccountBox from '@material-ui/icons/AccountBox';
// import Contacts from '@material-ui/icons/AlternateEmail';
import Work from '@material-ui/icons/WorkOutline';
import Domain from '@material-ui/icons/Domain';
import BarChartIcon from '@material-ui/icons/BarChart';
// import Note from '@material-ui/icons/Note';
// import {Col, Row} from "../Grid/Grid";


class SideNavItems extends React.Component {

render() {

 return (
   <div>
     <div className="sidenav-contents">
      <NavLink to='/dashboard' style={{ textDecoration: 'none' }}>
        <ListItem button id='overviewBtn' className='listBtn' name='overview'>
          <ListItemIcon className='listIcon'>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary='Dashboard' className='listTxt' />
        </ListItem>
      </NavLink>

      <NavLink to='/myJobs' style={{ textDecoration: 'none' }}>
        <ListItem button id='myJobsBtn' className='listBtn' name='myJobs'>
          <ListItemIcon className='listIcon'>
            <Work />
          </ListItemIcon>
          <ListItemText primary='My Jobs' className='listTxt' />
        </ListItem>
      </NavLink>

      <NavLink to='/contacts' style={{ textDecoration: 'none' }}>
        <ListItem button id='contactsBtn' className='listBtn'name='contacts'>
          <ListItemIcon className='listIcon'>
            <AccountBox />
          </ListItemIcon>
          <ListItemText primary='Contacts' className='listTxt' />
        </ListItem>
      </NavLink>

      <NavLink to='/companies' style={{ textDecoration: 'none' }}>
        <ListItem button id='companiesBtn' className='listBtn' name='companies'>
          <ListItemIcon className='listIcon'>
            <Domain />
          </ListItemIcon>
          <ListItemText primary='Companies' className='listTxt' />
        </ListItem>
      </NavLink>

     
     </div>
     {/* <NavLink to='/analytics' style={{ textDecoration: 'none' }}>
       <ListItem button id='progressBtn' className='listBtn' name='analytics'>
         <ListItemIcon className='listIcon'>
           <BarChartIcon />
         </ListItemIcon>
         <ListItemText primary='Analytics' className='listTxt' />
       </ListItem>
     </NavLink> */}


     {/* Secondary list items are currently a stand-in for a to-do's/notes sections on the side nav */}

     {/* <ListSubheader inset>To-Do's</ListSubheader> */}

       {/* <ListItem button className='listBtn'>
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
       </ListItem> */}

      
   </div>

   );
 }
}

export default SideNavItems;