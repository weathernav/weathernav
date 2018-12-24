import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import LocationSearch from './LocationSearch'

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

class Controls extends Component {
  constructor(props) {
    super(props)
    this.state = {
      origin: {},
      destination: {}
    }
  }

  onCoords(location, coords){
    this.setState({[location]: coords})
  }
  
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <ExpansionPanel expanded={true}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Search Weathernav</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <LocationSearch
              label='Search Origin'
              onCoords={this.onCoords.bind(this, 'origin')}
            />
            <LocationSearch
              label='Search Destination'
              onCoords={this.onCoords.bind(this, 'destination')}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}


Controls.propTypes = {
  classes: PropTypes.object.isRequired,
  onRouteSearch: PropTypes.func.isRequired
};

export default withStyles(styles)(Controls);
