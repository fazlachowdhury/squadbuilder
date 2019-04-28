import React, { Component } from 'react';
import './App.css';
import {Button, TextField} from '@material-ui/core';
import {TableComponent} from './components/TableComponent';
import {getPlayers} from '../src/api/getPlayers'
import {generateSquads} from './utils'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      squads: 0
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
            onChange={(event) => {
              console.log('state change', event.target.value)
              this.setState({
                squads: event.target.value
              })
            }}
          />
          <Button
            style={{margin: 10}}
            variant='contained'
            color='secondary'
            onClick = {(val) => generateSquads(this.state.players, this.state.squads)}>
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
