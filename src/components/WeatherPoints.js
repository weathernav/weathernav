import React, { Component } from 'react';
import PropTypes from 'prop-types';

import WeatherPointContainer from '../containers/WeatherPointContainer';
import WeatherPoint from './WeatherPoint';

const gmaps = google.maps; // eslint-disable-line

class WeatherPoints extends Component {
  render() {
    const { points } = this.props;
    return points.map((point, i) => {
      return (
        <WeatherPointContainer key={i} point={point}>
          {({ err, weather, point }) => (
            <WeatherPoint err={err} weather={weather} point={point} />
          )}
        </WeatherPointContainer>
      );
    });
  }
}

WeatherPoints.propTypes = {
  points: PropTypes.array.isRequired
};
export default WeatherPoints;
