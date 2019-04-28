import React, { Component } from 'react';
import './App.css';
import {Button, TextField} from '@material-ui/core';
import {TableComponent} from './components/TableComponent';
import {getPlayers} from '../src/api/getPlayers'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: []
    }
  }
componentWillMount() {
  this.getData();
}
  getData = async () => {
    this.setState({
      players: await getPlayers()
    })
  }
  
  render () {
    console.log('PROPS APP', this.state)
    return (
      <div className="App">
          <h1>Squad Maker</h1>
          <TextField
            style={{width: 300}}
            label='Enter Number of Squads'
          />
          <Button
            style={{margin: 10}} 
            variant='contained'
            color='secondary'
            onClick = {this.getData}>
          Create Squads
          </Button>
         <div>
            <TableComponent data={this.state.players[0]}/>
          </div>
      </div>
    );
  }
}

export default App;
