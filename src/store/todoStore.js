import { createSlice } from '@reduxjs/toolkit';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
  },
  reducers: {
    addTodo: (state) => {
      state.todos = [];
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
export const { increment, decrement, incrementByAmount } = todosSlice.actions;

export default todosSlice.reducer;
