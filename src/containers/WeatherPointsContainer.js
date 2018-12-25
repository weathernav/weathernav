import { Component } from 'react';
import PropTypes from 'prop-types';

const gmaps = google.maps; // eslint-disable-line

class WeatherPointsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      points: []
    };
  }
  componentDidMount() {
    const { points } = this.props;

    this.setState({ points });
  }
  render() {
    const { points } = this.state;
    return this.props.render({ points });
  }
}

WeatherPointsContainer.propTypes = {
  render: PropTypes.func.isRequired
};

export default WeatherPointsContainer;
