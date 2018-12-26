import { Component } from 'react';
import PropTypes from 'prop-types';

const WEATHER_TIME_INTERVAL = parseInt(
  process.env.REACT_APP_WEATHER_TIME_INTERVAL
); // 1hr intervals for weather info

class NavigationContainer extends Component {
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

    const weatherPoints = this.findWeatherPoints(steps).map(p => {
      return {
        timeElapsed: p.timeElapsed,
        lat: p.end_location.lat(),
        lng: p.end_location.lng()
      };
    });
    this.setState({ weatherPoints });
  }

  findWeatherPoints(steps, weatherPoints = [], travelTime = 0, totalTime = 0) {
    if (steps.length <= 0) return weatherPoints;

    const currStep = steps[0];
    const currDuration = currStep.duration.value;
    const remainingSteps = steps.slice(1);
    const timeToCurrStep = totalTime + currDuration;
    if (currDuration + travelTime > WEATHER_TIME_INTERVAL) {
      return this.findWeatherPoints(
        remainingSteps,
        [{ timeElapsed: timeToCurrStep, ...currStep }, ...weatherPoints],
        0,
        timeToCurrStep
      );
    }
    return this.findWeatherPoints(
      remainingSteps,
      weatherPoints,
      travelTime + currDuration,
      timeToCurrStep
    );
  }

  render() {
    const { locations, weatherPoints } = this.state;
    const onRouteSearch = this.onRouteSearch.bind(this);
    const onDirections = this.onDirections.bind(this);
    return this.props.children({
      locations,
      weatherPoints,
      onRouteSearch,
      onDirections
    });
  }
}

NavigationContainer.propTypes = {
  children: PropTypes.func.isRequired
};
export default NavigationContainer;
