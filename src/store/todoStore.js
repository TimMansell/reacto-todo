import { createSlice } from '@reduxjs/toolkit';

const todos = JSON.parse(localStorage.getItem('todos')) || [];

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos,
  },
  reducers: {
    addTodo: (state, action) => {
      const todo = action.payload;
      const todoItems = [...state.todos, todo];

      state.todos = todoItems;

      localStorage.setItem('todos', JSON.stringify(todoItems));
    },
    editTodo: (state) => {
      state.todos = [];
    },
    deleteTodo: (state) => {
      state.todos = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTodo, editTodo, deleteTodo } = todosSlice.actions;

export default todosSlice.reducer;
