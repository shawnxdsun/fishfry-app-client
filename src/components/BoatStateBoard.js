import React, { Component } from 'react';
import Board from 'react-trello';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const API_URL = 'http://34.168.188.168:8080';
const API_HEADERS = {
    'Content-Type': 'application/json',
};

export default class BoatStateBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        cards: {
          lanes: []
        },
        dialogOpen: false,
        dialogInputBoatName: '',
        dialogInputGuideName:'',
    };
  }

  //fetch data when page is loaded
  componentDidMount() {
    fetch(API_URL + '/cards', {method: 'GET', headers: API_HEADERS,})
    .then( (response) => response.json())
    .then( (responseData) => {
      this.setState({ cards: responseData });
    })
    .catch( (error) => {
      console.log('error fetching and parsing data', error);
      alert('fetching data failed');
    });
    console.log("reMount");
  };

  //handle dialog open
  handleClickOpen() {
    this.setState({
      dialogOpen: true
    })
  };

  //handle dialog input change
  handleDialogInputBoatChange(e){
    this.setState({
      dialogInputBoatName: e.target.value
    })
  }

  handleDialogInputGuideChange(e){
    this.setState({
      dialogInputGuideName: e.target.value
    })
  }

  //handle dialog close
  handleClose() {
    this.setState({
      dialogOpen: false
    })
  };

  //handle add new boat
  handleAddCard() {
    //get updated cards
    const updatedCards = {
      lanes: this.state.cards.lanes.map((item) => {
        if (item.id === 'lane1'){
          item.cards.push({
            id: (Math.floor((Math.random() * 1000000) + 1)).toString(), 
            title: this.state.dialogInputBoatName, 
            description: this.state.dialogInputGuideName, 
            laneId: "lane1", 
            metadata: {sha: 'be312a1'}});
          item.label = item.cards.length.toString();
          return item
        }
        item.label = item.cards.length.toString();
        return item;
      }),
    };
    this.setState({
      cards: updatedCards
    })  
    this.handleClose();
    //update cards on server
    fetch(API_URL + '/updateCards', {
      method: 'POST',
      headers: API_HEADERS,
      body: JSON.stringify(updatedCards),
    })
    .then( (response) => response.json())
    .then( (responseData) => {
      console.log(responseData);
    })
    .catch( (error) => {
      console.log('error updating cards:', error);
      alert('update board failed');
    });
  }

  handleDataChange(data){

    const updatedCards = {
      lanes: data.lanes.map((item) => {
          item.label = item.cards.length.toString();
          return item;
      }),
    };

    this.setState({
      cards: updatedCards
    })
    fetch(API_URL + '/updateCards', {
      method: 'POST',
      headers: API_HEADERS,
      body: JSON.stringify(data),
    })
    .then( (response) => response.json())
    .then( (responseData) => {
      console.log(responseData);
    })
    .catch( (error) => {
      console.log('error updating cards:', error);
      alert('update board failed');
    });
  }

  render() {
    return (
      <>
        <div data-testid="boat-state-board">
          <div id="add-boat-button" data-testid="boat-state-board-add-boat-button">
            <Button variant="contained" color="info" onClick={this.handleClickOpen.bind(this)}>
              Add Boat
            </Button>
          </div>
          <div id="add-boat-dialog" data-testid="boat-state-board-add-boat-dialog">
            <Dialog open={this.state.dialogOpen} onClose={this.handleClose.bind(this)}>
              <DialogTitle>Add Boat</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To add a new boat to this system, please enter the information about the new boat here. 
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Boat Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={this.state.dialogInputBoatName}
                  onChange={this.handleDialogInputBoatChange.bind(this)}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Guide Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={this.state.dialogInputGuideName}
                  onChange={this.handleDialogInputGuideChange.bind(this)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose.bind(this)}>Cancel</Button>
                <Button onClick={this.handleAddCard.bind(this)}>Confirm</Button>
              </DialogActions>
            </Dialog>
          </div>
          <div id="add-boat-board-container" data-testid="boat-state-board-add-boat-container">
            <div id="add-boat-board">
              <Board data={this.state.cards} onDataChange={this.handleDataChange.bind(this)} laneStyle={{backgroundColor: '#666'}} style={{backgroundColor: '#eee'}}/>
            </div>
          </div>
        </div>
        
      </>
    );
  }
}
