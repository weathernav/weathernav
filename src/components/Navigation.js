import React, { Component } from 'react';

import Map from './Map';
import Controls from './Controls';

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
    console.log(directions);
    // TODO: handle leg computations and weather requests
  }

  render() {
    const { locations } = this.state;
    return (
      <div>
        <Controls onRouteSearch={this.onRouteSearch.bind(this)} />
        <Map onDirections={this.onDirections.bind(this)} {...locations} />
      </div>
    );
  }
}

export default Navigation;
