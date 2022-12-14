import {nanoid} from 'nanoid';
import { updateLoading } from './loadingRedux';
import { API_URL } from '../settings/settings'

export const getAllTables = ({ tables }) => tables;
export const getLoadingFetching = ({ loadingFetching }) => loadingFetching;

export const getSingleTableById = ({ tables }, tableId) => tables
  .find(table => (table.id === tableId));

const createActionName = actionName => `app/tables/${actionName}`;
const ADD_TABLE = createActionName('ADD_TABLE');
const EDIT_TABLE = createActionName('EDIT_TABLE');
const REMOVE_TABLE = createActionName('REMOVE_TABLE');
const UPDATE_TABLES = createActionName('UPDATE_TABLES');

export const addTable = payload => ({ type: ADD_TABLE, payload });
export const editTable = payload => ({ type: EDIT_TABLE, payload });
export const removeTable = payload => ({ type: REMOVE_TABLE, payload });
export const updateTables = payload => ({ type: UPDATE_TABLES, payload });

export const fetchTables = () => {
  return (dispatch) => {
    dispatch(updateLoading(true));
    fetch(API_URL + '/tables')
    //fetch('http://localhost:3131/tables')
      .then(response => {
        if (response.status === 200) {
          return response.json()
            .then(tables => {
              dispatch(updateTables(tables));
              dispatch(updateLoading(false));
            });
        }
      });
  };
};

export const editTablesRequest = (editTables) => {
  return (dispatch) => {
    const options = {
      method: 'PATCH',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(editTables)
    };

    //fetch('http://localhost:3131/tables/' + editTables.id, options)
    fetch(API_URL + '/tables/' + editTables.id, options)
      .then(() => dispatch(editTable(editTables)))
  };
}

const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case ADD_TABLE:
      return [...statePart, { ...action.payload, id: nanoid() }];
    case EDIT_TABLE:
      return statePart.map(table => (table.id === action.payload.id ? { ...table, ...action.payload } : table));
    case UPDATE_TABLES:
      return [...action.payload];
    case REMOVE_TABLE:
      return statePart.filter(table => table.id !== action.payload)
    default:
      return statePart;
  }
}

export default tablesReducer;
