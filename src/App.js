import React, { Component } from 'react';
import BoatStateBoard from './components/BoatStateBoard';
import './App.css';

class App extends Component {
  render() {
    return (
      <>
      <div>Welcome to Fishfry Tours Boat Control System</div>
      <BoatStateBoard />
      </>
    );
  }
}

export default App;
