import React, { useState } from 'react';

import TodoBox from './TodoBox';
import TodoRemoveAllItems from './TodoRemoveAllItems';
import TodoList from './TodoList';
import TodoRemoveCompletedItems from './TodoRemoveCompletedItems';

const loadTodos = () => JSON.parse(localStorage.getItem('todoItem')) || [];

export const Todo = () => {
  const [todos, setTodos] = useState(() => {
    const initialState = loadTodos();
    return initialState;
  });

  const handleTodoSubmit = (todo) => {
    let items =
      localStorage.getItem('todoItem') !== null
        ? JSON.parse(localStorage.getItem('todoItem'))
        : [];

    // Add new item to array.
    items.push(todo);

    // Save to localStorage.
    localStorage.setItem('todoItem', JSON.stringify(items));

    setTodos(items);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-center">React Todo</h1>
      <p className="text-center">Type in a task below. Hit enter to save.</p>
      <TodoBox onTodoSubmit={(todo) => handleTodoSubmit(todo)} />
      <TodoRemoveAllItems />
      <TodoList todos={todos} />
      <TodoRemoveCompletedItems remainingTodos={todos.length} />
    </div>
  );
};

export default Todo;
