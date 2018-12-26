import { Component } from 'react';
import PropTypes from 'prop-types';

import { geocodeBySuggestion } from 'mui-places-autocomplete';

class WeatherPointContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coordinates: null,
      err: null
    };
  }

  render() {
    const { err } = this.state;
    return this.props.children({
      err,
      onSuggestionSelected: this.onSuggestionSelected.bind(this)
    });
  }
}

WeatherPointContainer.propTypes = {
  onCoords: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired
};
export default WeatherPointContainer;
