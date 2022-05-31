import React, { Component } from 'react';
import BoatStateBoard from './components/BoatStateBoard';
import BoatStateHeader from './components/BoatStateHeader';
import Container from 'react-trello/dist/dnd/Container';
import './App.css';

class App extends Component {
  render() {
    return (
      <Container>
        <BoatStateHeader />
        <BoatStateBoard />
      </Container>
    );
  }
}

export default App;
