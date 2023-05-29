const addTickets = (tickets) => ({ type: 'ADD_TICKETS', tickets });
const setSessionId = (id) => ({ type: 'SET_ID', sessionId: id });
const setError = (error) => ({ type: 'ERROR', error });
const setLoading = (load) => ({ type: 'LOADING', load });

const loadTickets = () =>
  async function getTickets(dispatch, getState) {
    if (getState().tickets.length && !getState().error) {
      dispatch(setLoading(false));
    } else {
      dispatch(setLoading(true));
    }
    dispatch(setError(false));
    let response;
    try {
      if (!getState().sessionId) {
        response = await fetch(`https://aviasales-test-api.kata.academy/search`);
        response
          .json()
          .then((data) => {
            dispatch(setSessionId(data.searchId));
            return fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${data.searchId}`);
          })
          .then((data) => data.json())
          .then(
            ({ tickets, stop }) => {
              dispatch(addTickets(tickets));
              if (!stop) {
                getTickets(dispatch, getState);
              }
            },
            (rej) => {
              if (rej instanceof TypeError) {
                throw rej;
              } else {
                getTickets(dispatch, getState);
              }
            }
          )
          .catch(() => {
            dispatch(setError(true));
          });
      } else {
        fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${getState().sessionId}`)
          .then((data) => data.json())
          .then(
            (data) => {
              const { tickets, stop } = data;
              if (tickets) {
                dispatch(addTickets(tickets));
              }
              if (!stop) {
                getTickets(dispatch, getState);
              }
            },
            (rej) => {
              if (rej instanceof TypeError) {
                throw rej;
              } else {
                getTickets(dispatch, getState);
              }
            }
          )
          .catch(() => {
            dispatch(setError(true));
          });
      }
    } catch (error) {
      dispatch(setError(true));
    }
  };

export { loadTickets };
