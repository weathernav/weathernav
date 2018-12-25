import React, { Component } from 'react';
import PropTypes from 'prop-types';

import WeatherPoint from './WeatherPoint';

const gmaps = google.maps; // eslint-disable-line

class WeatherPoints extends Component {
  render() {
    const { points } = this.props;
    return points.map((point, i) => {
      return <WeatherPoint key={i} point={point} />;
    });
  }
}

WeatherPoints.propTypes = {
  points: PropTypes.array.isRequired
};
export default WeatherPoints;
