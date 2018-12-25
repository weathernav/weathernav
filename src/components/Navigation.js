import React, { Component } from 'react';

import Map from './Map';
import Controls from './Controls';
const WEATHER_TIME_INTERVAL = parseInt(
  process.env.REACT_APP_WEATHER_TIME_INTERVAL
); // 1hr intervals for weather info

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: {}
    };
  }
  onRouteSearch(locations) {
    this.setState({ locations });
  }
  onDirections(directions) {
    const { steps } = directions.routes[0].legs[0];

    const weatherPoints = this.findWeatherPoints(steps).map(
      p => p.end_location
    );
    this.setState({ weatherPoints });
  }

  findWeatherPoints(steps, weatherPoints = [], travelTime = 0) {
    if (steps.length <= 0) return weatherPoints;

    const currStep = steps[0];
    const currDuration = currStep.duration.value;
    const remainingSteps = steps.slice(1);
    if (currDuration + travelTime > WEATHER_TIME_INTERVAL) {
      return this.findWeatherPoints(
        remainingSteps,
        [currStep, ...weatherPoints],
        0
      );
    }
    return this.findWeatherPoints(
      remainingSteps,
      weatherPoints,
      travelTime + currDuration
    );
  }

  render() {
    const { locations, weatherPoints } = this.state;
    return (
      <div>
        <Controls onRouteSearch={this.onRouteSearch.bind(this)} />
        <Map
          onDirections={this.onDirections.bind(this)}
          {...locations}
          weatherPoints={weatherPoints}
        />
      </div>
    );
  }
}

export default Navigation;
