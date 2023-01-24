import {combineReducers} from 'redux';
import {signInReducer} from './user';
import {fetchTasksReducer} from './tasks';
import {updateTaskReducer} from './task';
import {addDataReducer} from './addData';
import {newPackingReducer} from './newPacking';
import {duplicatePackingReducer} from './duplicatePacking';


export default combineReducers({
  auth: signInReducer,
  fetchTasks: fetchTasksReducer,
  updateTask: updateTaskReducer,
  addData: addDataReducer,
  newPacking: newPackingReducer,
  duplicatePacking: duplicatePackingReducer
});
