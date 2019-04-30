import React, { Component } from 'react';
import './App.css';
import _ from 'lodash';
import {Button, TextField} from '@material-ui/core';
import {TableComponent} from './components/TableComponent';
import {getPlayers} from '../src/api/getPlayers'
import {generateSquads} from './utils'
import { element } from 'prop-types';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      squads:  0,
      squadsArray: []
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

  //Handles Create Squad button click event
  handleOnClick = () => {
    const tempArray = generateSquads(this.state.players, this.state.squads);
    this.setState({
      squadsArray: tempArray
    })

  }

  //Handles Reset Squad button click event
  resetOnClick = () => {
    this.setState({
        squads: 0,
        squadsArray: []
    }) 
  }

  renderArrayElements = (val) => {
    const tempRenderer = [];
    if (!_.isEmpty(this.state.squadsArray)) {
      _.each(this.state.squadsArray, (element) => {
        tempRenderer.push(<TableComponent id={_.uniqueId()} data={element}/>)
      })
    }
   return tempRenderer
  }

  render () {
    return (
      <div className="App">
          <h1>Squad Maker</h1>
          <TextField
            style={{width: 300}}
            label='Enter Number of Squads '
            onChange={(event) => {
              this.setState({
                squads: event.target.value
              })
            }}
          />
          <Button className = 'createSquads'
            style={{margin: 10}}
            variant='contained'
            color='primary'
            onClick = {this.handleOnClick}
            >
          Create Squads
          </Button>
          <Button className = 'resetSquads'
            style={{margin: 10}}
            variant='contained'
            color='secondary'
            onClick = {this.resetOnClick}
            >
          Reset Squads
          </Button>
          {this.renderArrayElements()}
      </div>
    );
  }
}

export default App;
