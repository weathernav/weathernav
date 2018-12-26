import { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class WeatherPointContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      err: null,
      weather: {}
    };
  }

  async componentDidMount() {
    const { point } = this.props;
    const weatherTS = Date.now() / 1000 + point.timeElapsed;
    try {
      const resp = await axios.get(process.env.REACT_APP_WEATHER_FORECAST_URL, {
        params: {
          key: process.env.REACT_APP_WEATHER_FORECAST_KEY,
          lat: point.lat,
          lon: point.lng,
          units: 'I'
        }
      });
      const weatherData = resp.data.data;
      const timeDiffs = weatherData.map((hourlyForecast, i) => {
        return Math.abs(hourlyForecast.ts - weatherTS);
      });
      const index = timeDiffs.indexOf(Math.min.apply(Math, timeDiffs));
      const weather = {
        precipPct: weatherData[index].pop,
        temp: weatherData[index].temp,
        desc: weatherData[index].weather.description,
        timestamp: new Date(weatherData[index].ts * 1000)
      };
      this.setState({ weather });
    } catch (err) {
      this.setState({ err });
    }
  }

  render() {
    const { err, weather } = this.state;
    const { point } = this.props;
    return this.props.children({ err, weather, point });
  }
}

WeatherPointContainer.propTypes = {
  children: PropTypes.func.isRequired,
  point: PropTypes.object.isRequired
};
export default WeatherPointContainer;
