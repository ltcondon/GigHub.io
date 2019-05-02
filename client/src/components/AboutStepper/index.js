import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import "./style.css";

// Stepper component from React Material UI with some important info about our app to display on landing page
const styles = theme => ({
    root: {
      width: '90%',
    },
    button: {
      marginTop: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    actionsContainer: {
      marginBottom: theme.spacing.unit * 2,
    },
    resetContainer: {
      padding: theme.spacing.unit * 3,
    },
});
  
// Get steps returns the the values of the steps for each tab
function getSteps() {
  return ['Track your milestones', 'All the essential info in one place', 'Never miss an opportunity'];
}
  
// Switch case for determining which content to display based on step indice 
function getStepContent(step) {
  switch (step) {
    case 0:
      return `The job search can get overwhelming fast. How many applications have I sent out? Which companies have called me back? Do I have interviews coming up? We've got the tools you need to keep track of all this and more.`;

      case 1:
      return 'GigHub tracks and visualizes your job search progression from start to finish.';

      case 2:
        return `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`;

      default:
        return 'Unknown step';
    }
  }
  
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
        <div className={classes.root}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Typography>{getStepContent(index)}</Typography>
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} className={classes.resetContainer}>
              <Typography>All steps completed - you&apos;re finished</Typography>
              <Button onClick={this.handleReset} className={classes.button}>
                Reset
              </Button>
            </Paper>
          )}
        </div>
      );
    }
}
  
AboutStepper.propTypes = {
  classes: PropTypes.object,
};
  
export default withStyles(styles)(AboutStepper);