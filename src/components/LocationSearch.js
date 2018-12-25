import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MUIPlacesAutocomplete from 'mui-places-autocomplete';

class LocationSearch extends Component {
  render() {
    const { label, onSuggestionSelected } = this.props;
    return (
      <div>
        <MUIPlacesAutocomplete
          onSuggestionSelected={onSuggestionSelected}
          renderTarget={() => <div />}
          textFieldProps={{ label }}
        />
      </div>
    );
  }
}

LocationSearch.propTypes = {
  label: PropTypes.string.isRequired,
  onSuggestionSelected: PropTypes.func.isRequired
};
export default LocationSearch;
