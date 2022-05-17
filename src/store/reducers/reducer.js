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

    case Types.WIPE_REDUX:
      return initialState;
    
      default:
      return state;
  }
};

export { reducer };
