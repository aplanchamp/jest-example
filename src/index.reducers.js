import { combineReducers } from 'redux';
import {reducer} from './Onboarding/Onboarding.reducer';
import { keysReducer } from 'react-keys';

const IndexReducer = combineReducers({
    '@@keys': keysReducer,  
    reducer 
})
  
export default IndexReducer; 