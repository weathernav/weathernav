import React, { Component } from 'react';

import Map from './Map'
import Controls from './Controls'

class Navigation extends Component {
  render() {
    return (
      <div>
        <Controls onRouteSearch={()=>{}}/>
        <Map/>
      </div>
    )
  }
}

export default Navigation;
