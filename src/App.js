import React, { Component } from 'react';
import './App.css';
import {Button, TextField} from '@material-ui/core';
import {TableComponent} from './components/TableComponent';
import { connect } from 'react-redux';
import handleFetchData from './actions';
import { bindActionCreators } from 'redux'
import {getPlayers} from '../src/api/getPlayers'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: []
    }
  }

  getData = async () => {
    this.setState({
      players: await getPlayers()
    })
  } 

  render () {
    console.log('PROPS APP', this.props, this.state)
    return (
      <div className="App">
          <h1>Squad Maker</h1>
          <TextField
           style={{width: 300}}
            label='Enter Number of Squads'
          />
          <Button variant='contained' color='secondary' onClick = {this.getData}>
          TRY
          </Button>
         <div>
          {/* {this.props.fetchData()} */}
            <TableComponent />
          </div>
          <div>
            <TableComponent />
          </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    app: state
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    handleFetchData,
  },
  dispatch,
)

export default connect(mapStateToProps, mapDispatchToProps)(App)
