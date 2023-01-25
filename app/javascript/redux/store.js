import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import rootReducer from './reducers';

const store = configureStore({ reducer: rootReducer });

export const useAppDispatch = () => useDispatch();

export default store;
