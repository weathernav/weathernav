import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';
import { Marker } from 'react-google-maps';

const gmaps = google.maps; // eslint-disable-line

const styles = theme => ({
  container: { backgroundColor: 'white', opacity: 0.75, padding: '12px' },
  contents: { fontSize: '16px', fontColor: '#08233B' }
})

class WeatherPoint extends Component {
  render() {
    const { point, weather, classes } = this.props;
    return (
      <Marker position={point} defaultVisible={false}>
        <InfoBox options={{ closeBoxURL: '', enableEventPropagation: true }}>
          <div
            className={classes.container}
          >
            <div className={classes.contents}>
              <List>
                <ListItem >
                  <ListItemText primary={`Temp: ${weather.temp}°`} />
                </ListItem>
                <ListItem >
                  <ListItemText primary={`Precipitation: ${weather.precipPct}%`} />
                </ListItem>
                <ListItem >
                  <ListItemText primary={`Description: ${weather.desc}`} />
                </ListItem>
              </List>
            </div>
          </div>
        </InfoBox>
      </Marker>
    );
  }
}

WeatherPoint.propTypes = {
  classes: PropTypes.object.isRequired,
  point: PropTypes.object.isRequired,
  weather: PropTypes.object.isRequired,
  err: PropTypes.object
};
export default withStyles(styles)(WeatherPoint);
