import { combineReducers } from 'redux';

import counter from './slices/counter';

const rootReducer = combineReducers({ counter });

export default rootReducer;
