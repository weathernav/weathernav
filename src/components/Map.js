import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { compose, withProps } from 'recompose';
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} from 'react-google-maps';

import WeatherPoints from './WeatherPoints';

const gmaps = google.maps; // eslint-disable-line

const enhance = compose(
  withProps({
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100vh' }} />,
    mapElement: <div style={{ height: '100%' }} />
  }),
  withGoogleMap
);

class Map extends Component {
  render() {
    const { weatherPoints, directions } = this.props;
    return (
      <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
        {directions && <DirectionsRenderer directions={directions} />}
        {weatherPoints && <WeatherPoints points={weatherPoints} />}
      </GoogleMap>
    );
  }
}

Map.propTypes = {
  directions: PropTypes.object,
  weatherPoints: PropTypes.array,
  err: PropTypes.object
};
export default enhance(Map);
