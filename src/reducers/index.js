import {combineReducers} from 'redux';
import {ADD_COMMENT} from '../actions/commentsTypes';

const comments = (state = {count: 0, comments: []}, action) => {
  switch(action.type) {
    case ADD_COMMENT:
      return ({
        ...state,
        comments: [...state.comments, action.payload],
        count: state.count + 1
      });
    default: return state;
  }
};

const count = (state = 0, action) => {
  switch(action.type) {
    case 'ADD_USER':
      return state + 1;
    default: return state;
  }
};

const records = (state = [], action) => {
  switch(action.type) {
    case 'ADD_USER':
      return [...state, action.payload];
    default: return state;
  }
};

const users = combineReducers({
  count,
  records
});

export default combineReducers({
  comments,
  users
});

export const getCommentCounts = state => state.comments.count;
export const getComments = state => state.comments.comments;
export const getFirst10Comments = state => state.comments.comments.slice(0, 10);
