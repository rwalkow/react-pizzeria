export const getLoading = ({ loadingFetching }) => loadingFetching;

const createActionName = actionName => `app/loading/${actionName}`;
const UPDATE_LOADING = createActionName('UPDATE_TABLES');

export const updateLoading = payload => ({ type: UPDATE_LOADING, payload });

const loadingReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_LOADING:
      return action.payload;
    default:
      return statePart;
  }
}

export default loadingReducer;
