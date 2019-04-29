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
      squads: 0,
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

  handleOnClick = () => {
    const tempArray = generateSquads(this.state.players, this.state.squads);
    this.setState({
      squadsArray: tempArray
    })
  }

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
  //   tempRenderer.push(<div id={_.uniqueId()}>
  //     <TableComponent data={element}/>
  //  </div>)
   return tempRenderer
  }

  render () {
    return (
      <div className="App">
          <h1>Squad Maker</h1>
          <TextField
            style={{width: 300}}
            label='Enter Number of Squads'
            onChange={(event) => {
              this.setState({
                squads: event.target.value
              })
            }}
          />
          <Button className = 'createSquads'
            style={{margin: 10}}
            variant='contained'
            color='secondary'
            onClick = {(val) => this.handleOnClick()}
            >
          Create Squads
          </Button>
          <Button className = 'resetSquads'
            style={{margin: 10}}
            variant='contained'
            color='secondary'
            onClick = {(val) => this.resetOnClick()}
            >
          Reset Squads
          </Button>
          {/* {!_.isEmpty(this.state.squadsArray)? (
            _.each(this.state.squadsArray, (element)=>{
              this.renderArrayElements(element)
              // return (
              // <div id={_.uniqueId()}>
              //   <TableComponent data={element}/>
              // </div>
            // )
            })
          ) : []
          } */}
          {this.renderArrayElements()}
      </div>
    );
  }
}

export default App;
