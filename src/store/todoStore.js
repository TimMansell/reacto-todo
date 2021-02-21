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
    editTodo: (state, action) => {
      const { todos } = state;
      const updatedTodo = action.payload;

      const updatedTodos = todos.map((todo) => {
        if (todo.key === updatedTodo.key) {
          return updatedTodo;
        }

        return todo;
      });

      state.todos = updatedTodos;

      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    },
    deleteTodo: (state, action) => {
      const key = action.payload;
      const { todos } = state;

      const updatedTodos = todos.filter((todo) => todo.key !== key);

      state.todos = updatedTodos;

      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    },
    deleteTodos: (state) => {
      state.todos = [];

      localStorage.removeItem('todos');
    },
    completedTodo: (state, action) => {
      const { todos } = state;
      const key = action.payload;

      const updatedTodos = todos.map((todo) => {
        if (todo.key === key) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      });

      state.todos = updatedTodos;

      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    },
    clearCompletedTodos: (state) => {
      const { todos } = state;

      const updatedTodos = todos.filter((todo) => !todo.completed);

      state.todos = updatedTodos;

      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addTodo,
  editTodo,
  deleteTodo,
  deleteTodos,
  completedTodo,
  clearCompletedTodos,
} = todosSlice.actions;

export default todosSlice.reducer;
