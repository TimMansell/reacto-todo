import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todoStore';

export default configureStore({
  reducer: {
    todos: todosReducer,
  },
});
