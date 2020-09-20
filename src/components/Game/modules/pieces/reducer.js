/* holds constants and actions that have to do with pieces.  Most piece actions are handled by middleware. */
import { ADD_TAKEN_PIECE } from './actions';

export default (state = [], action) => {
  switch(action.type) {
    case ADD_TAKEN_PIECE:
      return [...state, { pieceId: action.pieceId, color: action.color }];
    default:
      return state;
  }
};
