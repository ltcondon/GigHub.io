import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
// import AddJobIcon from '@material-ui/icons/AddBox'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import AccountBox from '@material-ui/icons/AccountBox';
// import PlaylistAddCheckTwoTone from '@material-ui/icons/PlaylistAddCheckTwoTone';
import Contacts from '@material-ui/icons/AlternateEmail';
import Work from '@material-ui/icons/WorkOutline';
import Domain from '@material-ui/icons/Domain';
import BarChartIcon from '@material-ui/icons/BarChart';
import Note from '@material-ui/icons/Note';


class SideNavItems extends React.Component {

 render() {

  return (

    <div>
      <Link to='/overview' style={{ textDecoration: 'none' }}>
        <ListItem button id='overviewBtn' className='listBtn' onClick={this.props.click} name='overview'>
          <ListItemIcon className='listIcon'>
            <AccountBox />
          </ListItemIcon>
          <ListItemText primary='Overview' className='listTxt' />
        </ListItem>
      </Link>

      <Link to='/myJobs' style={{ textDecoration: 'none' }}>
        <ListItem button id='myJobsBtn' className='listBtn' onClick={this.props.click} name='myJobs'>
          <ListItemIcon className='listIcon'>
            <Work />
          </ListItemIcon>
          <ListItemText primary='My Jobs' className='listTxt' />
        </ListItem>
      </Link>

      <Link to='/contacts' style={{ textDecoration: 'none' }}>
        <ListItem button id='contactsBtn' className='listBtn' onClick={this.props.click} name='contacts'>
          <ListItemIcon className='listIcon'>
            <Contacts />
          </ListItemIcon>
          <ListItemText primary='Contacts' className='listTxt' />
        </ListItem>
      </Link>

      <Link to='/companies' style={{ textDecoration: 'none' }}>
        <ListItem button id='companiesBtn' className='listBtn' onClick={this.props.click} name='companies'>
          <ListItemIcon className='listIcon'>
            <Domain />
          </ListItemIcon>
          <ListItemText primary='Companies' className='listTxt' />
        </ListItem>
      </Link>

      <Link to='/analytics' style={{ textDecoration: 'none' }}>
        <ListItem button id='progressBtn' className='listBtn' onClick={this.props.click} name='analytics'>
          <ListItemIcon className='listIcon'>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary='Analytics' className='listTxt' />
        </ListItem>
      </Link>

      <Divider />

      {/* Secondary list items are currently a stand-in for a to-do's/notes sections on the side nav */}

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
  }
}
// Secondary list items are currently a stand-in for a to-do's/notes sections on the side nav
//   <div>
//     <ListSubheader inset>To-Do's</ListSubheader>

//     <ListItem button className='listBtn'>
//       <ListItemIcon className='listIcon'>
//         <Note />
//       </ListItemIcon>
//       <ListItemText primary='Find job' />
//     </ListItem>

//     <ListItem button className='listBtn'>
//       <ListItemIcon className='listIcon'>
//         <Note />
//       </ListItemIcon>
//       <ListItemText primary='Interview' />
//     </ListItem>

//     <ListItem button className='listBtn'>
//       <ListItemIcon className='listIcon'>
//         <Note />
//       </ListItemIcon>
//       <ListItemText primary='Land job' />
//     </ListItem>
//   </div>
// );

// export const finalListItems = (
//   <div>
//     <Link to='/dashboard/addJob' style={{ textDecoration: 'none' }}>
//       <ListItem button id='addJobBtn' className='listBtn'>
//         <ListItemIcon className='listIcon'>
//           <AddJobIcon />
//         </ListItemIcon>
//         <ListItemText primary='Add a Job' className='listTxt' />
//       </ListItem>
//     </Link>
//   </div>
// )

export default SideNavItems;