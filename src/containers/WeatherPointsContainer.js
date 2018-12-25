import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, withProps, toRenderProps } from 'recompose';

const gmaps = google.maps; // eslint-disable-line

class WeatherPointsContainer extends Component {
  constructor(props) {
    super(props);
    console.log('constructor');
    this.state = {
      points: []
    };
  }
  componentDidMount() {
    const nextProps = this.props;
    const { points } = this.props;

    this.setState({ points });
  }
  render() {
    const { points } = this.state;
    return this.props.render({ points });
  }
}

export default WeatherPointsContainer;
