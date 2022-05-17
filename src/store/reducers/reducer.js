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

    case Types.DELETE_ALL:
      return initialState;
    
      default:
      return state;
  }
};

export { reducer };
