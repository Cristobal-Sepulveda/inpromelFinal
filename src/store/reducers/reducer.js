import * as Types from '../actions/types';

const initialState = {
  session: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    
    case Types.INSERT_SESSION:
      return { ...state, session: [action.payload.token] };

    case Types.DELETE_SESSION:
      return {
        ...state,
        session: [],
      };
    case Types.INSERT_LOCATION:
      return {
        ...state,
        location: [action.payload.location],
      };
    
    case Types.SELECT_LOCATION:
      return state.location;
      
    case Types.WIPE_REDUX:
      return initialState;
    
      default:
      return state;
  }
};

export { reducer };
