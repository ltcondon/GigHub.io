import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './style.css';

// Styling that will be exported with the component
const styles = theme => ({
    root: {
      width: '100%',
      background: 'rgba(0,0,0,0)',
      paddingRight: '14.25%',
      paddingLeft: '12%',
    },
    button: {
      marginTop: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      textTransform: 'lowercase',
      outline: 'none',
      background: '#FF5C62',
      maxHeight: '29px',
      maxWidth: '26px',
      color: 'white',
      paddingLeft: '5%',
      paddingBottom: '1%',
      marginLeft: '1.5%',
    },
    actionsContainer: {
      marginBottom: theme.spacing.unit * 2,
      background: 'rgba(0,0,0,0)',
    },
    resetContainer: {
      padding: theme.spacing.unit * 3,
    },
    label: {
      color: '#F7F4E9',
      fontSize: '1.35rem',
    },
    typography: {
      paddingLeft: '2.25%',
    },
    topButton: {
      marginLeft: '2.5%',
    },
});

const style = {
  background: 'rgba(0,0,0,0)',
  color: '#F7F4E9',
  fontSize: '1.2rem',
}

const labelStyle = {
  fontSize: '1.8rem',
}
  
// Get steps returns the the values of the steps for each tab to display as a label
function getSteps() {
  return [`< 𝙏𝙧𝙖𝙘𝙠 𝙖𝙣𝙙 𝙪𝙥𝙙𝙖𝙩𝙚 𝙮𝙤𝙪𝙧 𝙢𝙞𝙡𝙚𝙨𝙩𝙤𝙣𝙚𝙨 >`, `< 𝘼𝙡𝙡 𝙩𝙝𝙚 𝙚𝙨𝙨𝙚𝙣𝙩𝙞𝙖𝙡 𝙞𝙣𝙛𝙤 𝙞𝙣 𝙤𝙣𝙚 𝙥𝙡𝙖𝙘𝙚 >`, `< 𝙂𝙞𝙜𝙃𝙪𝙗'𝙨 𝙜𝙤𝙩 𝙮𝙤𝙪 𝙘𝙤𝙫𝙚𝙧𝙚𝙙! >`];
}
  
// Switch case for determining which content to display based on step index 
function getStepContent(step) {
  switch (step) {
    case 0:
      return `The job search can get overwhelming fast. How many applications have I sent out? Which companies have called me back? Do I have interviews coming up? We've got the tools you need to keep track of all this and more.`;

      case 1:
      return `GigHub tracks and visualizes the progression of your job search from start to finish. See what people are saying about the work environment, culture, and salary competitiveness at the companies you've applied to, and track statistics for your own application process! Add and update contacts to keep track of your network, and make sure it never stops growing.`;

      case 2:
        return `Knowing where you're at is as important as knowing where you're going. Sometimes that last-minute email after a phone-screen is enough to signal that you're really interested in working somewhere, and with how many applications you'll be sending out, it isn't always easy to remember where you're at in the process. Don't stress, and don't miss another opportunity. Login with your LinkedIn account below to get started.`;

      default:
        return 'Unknown step';
    }
}
  
// Stepper component from React Material UI with some important info about our app to display on landing page
class AboutStepper extends React.Component {

    // This component keeps track of which step is active so that each step can be linked to the one before it and the one after it for navigation purposes
    state = {
      activeStep: 0,
    };
  
    // Increment step state by 1 to move to next step
    handleNext = () => {
      this.setState(state => ({
        activeStep: state.activeStep + 1,
      }));
    };
  
    // Decrement by 1 to move back a step
    handleBack = () => {
      this.setState(state => ({
        activeStep: state.activeStep - 1,
      }));
    };
  
    //  Reset reverts to first step
    handleReset = () => {
      this.setState({
        activeStep: 0,
      });
    };
  
    render() {
      const { classes } = this.props;
      const steps = getSteps();
      const { activeStep } = this.state;
  
      return (
      <div className="aboutStepper">
        <div className={classes.root}>
          <Stepper style={style} activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label} style={style}>
                <StepLabel className="stepLabel" style={labelStyle}>{label}</StepLabel>
                <StepContent style={style}>
                  <Typography style={style} className="textBody">{getStepContent(index)}</Typography>
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        ←
                      </Button>
                      <Button
                        variant="contained"
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? '→' : '→'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper style={style} square elevation={0} className={classes.resetContainer}>
              <Typography className={classes.typography}>―――――</Typography>
              <Button onClick={this.handleReset} className={classes.topButton}>
                top ↑
              </Button>
            </Paper>
          )}
        </div>
      </div>
      );
    }
}
  
AboutStepper.propTypes = {
  classes: PropTypes.object,
};
  
export default withStyles(styles)(AboutStepper);