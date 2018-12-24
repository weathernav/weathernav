import React, { Component } from 'react';

import Map from './Map';
import Controls from './Controls';

class Navigation extends Component {
  constructor(props){
    super(props)
    this.state = {
      locations: {}
    }
  }
  onRouteSearch(locations) {
    this.setState({locations})
  }

  render() {
    const { locations } = this.state
    return (
      <div>
        <Controls onRouteSearch={this.onRouteSearch.bind(this)} />
        <Map {...locations} />
      </div>
    );
  }
}

export default Navigation;
