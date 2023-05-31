const reducerFilters = (
  // eslint-disable-next-line default-param-last
  state = {
    transfers: ['0 пересадок', '1 пересадка', '2 пересадки', '3 пересадки'],
    filters: 'Самый дешевый',
    tickets: [],
    error: false,
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case 'SET_ID': {
      return {
        ...state,
        sessionId: action.sessionId,
      };
    }
    case 'ADD_TICKETS': {
      return {
        ...state,
        tickets: [...state.tickets, ...action.tickets],
      };
    }
    case 'SELECT': {
      return {
        ...state,
        filters: action.value,
      };
    }
    case 'TRANSFERS': {
      return {
        ...state,
        transfers: action.transfers,
      };
    }
    case 'LOADING': {
      return {
        ...state,
        loading: action.load,
      };
    }
    case 'ERROR': {
      return {
        ...state,
        error: action.error,
      };
    }

    default:
      return state;
  }
};

export { reducerFilters };
