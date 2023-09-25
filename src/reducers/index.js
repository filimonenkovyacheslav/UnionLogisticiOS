import {combineReducers} from 'redux';
import {signInReducer} from './user';
import {fetchTasksReducer} from './tasks';
import {updateTaskReducer} from './task';
import {addDataReducer} from './addData';
import {newPackingReducer} from './newPacking';
import {duplicatePackingReducer} from './duplicatePacking';
import {addListReducer} from './addList';
import {fetchChecklistReducer} from './checklist';
import {addReceiptReducer} from './addReceipt';
import {fetchTrackingListNamesReducer} from './trackingListNames';
import {addChecksHistoryReducer} from './addChecksHistory';


export default combineReducers({
  auth: signInReducer,
  fetchTasks: fetchTasksReducer,
  updateTask: updateTaskReducer,
  addData: addDataReducer,
  newPacking: newPackingReducer,
  duplicatePacking: duplicatePackingReducer,
  addList: addListReducer,
  fetchChecklist: fetchChecklistReducer,
  addReceipt: addReceiptReducer,
  fetchTrackingListNames: fetchTrackingListNamesReducer,
  addChecksHistory: addChecksHistoryReducer
});
