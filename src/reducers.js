import {handleActions} from 'redux-actions';
import {combineReducers} from 'redux';


const initialState = {
  person: {}, 
  character: {},
  show: {}
};

const entities = handleActions({
  FETCH_SHOW_SUCCESS: (state, action) => {
    const {show, person, character} = action.payload.entities;
      return {
        ...state, 
        show: {...state.show, ...show},
        person: {...state.person, ...person},
        character: {...state.character, ...character}
      };
  }
}, initialState);

export default combineReducers({
  entities
});

const getEntityById = (state, entityType, id) => state.entities[entityType].find(el => el.id === id);
