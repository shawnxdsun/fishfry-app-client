import React, { Component } from 'react';
import Board from 'react-trello';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const API_URL = 'http://34.82.189.49:8080';
const API_HEADERS = {
    'Content-Type': 'application/json',
};
const CustomAddCardLink =  ({onClick, t}) => <button onClick={onClick}>{t('Click to add card')}</button>

export default class BoatStateBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        cards: {
          lanes: []
        },
        dialogOpen: false,
        dialogInput: '',
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
  handleDialogInputChange(e){
    this.setState({
      dialogInput: e.target.value
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
    this.handleClose();
    //get updated cards
    const updatedCards = {
      lanes: this.state.cards.lanes.map((item) => {
        if (item.id === 'lane1'){
          item.cards.push({id: (Math.floor((Math.random() * 1000000) + 1)).toString(), title: this.state.dialogInput, description: 'Transfer via NEFT', label: '5 mins', laneId: "lane1", metadata: {sha: 'be312a1'}});
          return item
        }
        return item;
      }),
    };
   
    this.setState({
      cards: updatedCards
    })
    
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
      // to do: show snack bar
    });
  }

  handleDataChange(data){
    fetch(API_URL + '/updateCards', {
      method: 'POST',
      headers: API_HEADERS,
      body: JSON.stringify(data),
    }).catch( (error) => {
      console.log('error updating cards:', error);
    });
  }

  render() {
    return (
      <>
        <div>
          <div id="add-boat-button">
            <Button variant="contained" color="info" onClick={this.handleClickOpen.bind(this)}>
              Add Boat
            </Button>
          </div>
          <div id="add-boat-dialog">
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
                  value={this.state.dialogInput}
                  onChange={this.handleDialogInputChange.bind(this)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose.bind(this)}>Cancel</Button>
                <Button onClick={this.handleAddCard.bind(this)}>Confirm</Button>
              </DialogActions>
            </Dialog>
          </div>
          <div id="add-boat-board-container">
            <div id="add-boat-board">
            <Board data={this.state.cards} onDataChange={this.handleDataChange.bind(this)} laneStyle={{backgroundColor: '#666'}} style={{backgroundColor: '#eee'}} components={{AddCardLink: CustomAddCardLink}}/>
            </div>
          </div>
        </div>
        
      </>
    );
  }
}
