import * as Types from "../actions/types";

const initialState = {
  session: [],
  location: [],
  pendientes: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // SESSION
    case Types.INSERT_SESSION:
      return { ...state, session: [action.payload.token] };

    case Types.DELETE_SESSION:
      return {
        ...state,
        session: [],
      };

    // LOCATION
    case Types.INSERT_LOCATION:
      return {
        ...state,
        location: [action.payload.location],
      };

    case Types.SELECT_LOCATION:
      return state.location;

    // PENDIENTES
    case Types.INSERT_PENDIENTE: {
      const { pendientes } = state;
      pendientes.push(action.payload);
      return state;
    }

    case Types.SELECT_PENDIENTES:
      return state.pendientes;

    case Types.DELETE_PENDIENTE:
      return state.pendientes.filter((item) => item !== action.payload);

    case Types.DELETE_PENDIENTES:
      return { ...state, pendientes: [] };

    // WIPE ALL
    case Types.WIPE_REDUX:
      return initialState;

    default:
      return state;
  }
};

export { reducer };
