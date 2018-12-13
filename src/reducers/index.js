import {combineReducers} from 'redux';

const comments = (state = {count: 0, comments: []}, action) => {
  switch(action.type) {
    case 'ADD_COMMENT':
      return ({
        ...state,
        comments: [...state.comments, action.payload],
        count: state.count + 1
      });
    default: return state;
  }
};

const count = (state = 0, action) => {
  return state;
};

const records = (state = [], action) => {
  return state;
};

const users = combineReducers({
  count,
  records
});

export default combineReducers({
  comments,
  users
});