import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todo';

export default configureStore({
  reducer: {
    todos: todosReducer,
  },
});
