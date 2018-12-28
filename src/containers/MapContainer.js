import { Component } from 'react';
import PropTypes from 'prop-types';

const gmaps = google.maps; // eslint-disable-line
const WEATHER_TIME_INTERVAL = parseInt(
  process.env.REACT_APP_WEATHER_TIME_INTERVAL
); // 1hr intervals for weather info

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      directions: null,
      weatherPoints: [],
      origin: null,
      destination: null,
      err: null
    };
  }

  componentWillReceiveProps(nextProps) {
    const { origin, destination } = this.props;
    const { origin: nextOrigin, destination: nextDestination } = nextProps;
    if (!nextOrigin || !nextDestination) return;
    if (
      origin &&
      origin.lat === nextOrigin.lat &&
      origin.lng === nextOrigin.lng &&
      destination &&
      destination.lat === nextDestination.lat &&
      destination.lng === nextDestination.lng
    )
      return;

    const DirectionsService = new gmaps.DirectionsService();
    DirectionsService.route(
      {
        origin: new gmaps.LatLng(nextOrigin.lat, nextOrigin.lng),
        destination: new gmaps.LatLng(nextDestination.lat, nextDestination.lng),
        travelMode: gmaps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === gmaps.DirectionsStatus.OK) {
          this.setState({
            directions: result
          });
          this.directionsToWeatherPoints(result);
        } else {
          this.setState({
            err: new Error('Unable to fetch driving directions.')
          });
        }
      }
    );
  }
  directionsToWeatherPoints(directions) {
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
    const { directions, weatherPoints, err } = this.state;
    return this.props.children({ err, directions, weatherPoints });
  }
}

MapContainer.propTypes = {
  origin: PropTypes.object,
  destination: PropTypes.object,
  children: PropTypes.func.isRequired
};
export default MapContainer;
