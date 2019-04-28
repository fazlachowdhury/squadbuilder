import {getPlayers} from '../api/getPlayers'
import {FETCH_DATA} from '../constants'
const initialState = {
    players:  [],
    test: 'ABCD'
  };
  async function rootReducer(state = initialState, action) {
      console.log('action', action)
      switch(action.type) {
          case FETCH_DATA:
          return {
            ...state,
            players: action.payload
          }
          default: 
          return state;
      }
  };
  export default rootReducer;