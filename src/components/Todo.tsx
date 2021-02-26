import React from 'react';
import { useSelector } from 'react-redux';

import TodoBox from './TodoBox';
import TodoRemoveAllItems from './TodoRemoveAllItems';
import TodoList from './TodoList';
import TodoRemoveCompletedItems from './TodoRemoveCompletedItems';

export const Todo = () => {
  const todos = useSelector((state) => state.todos.todos);

  return (
    <div className="container mx-auto">
      <h1 className="text-center">React Todo</h1>
      <p className="text-center">Type in a task below. Hit enter to save.</p>
      <TodoBox />
      <TodoRemoveAllItems />
      <TodoList todos={todos} />
      <TodoRemoveCompletedItems remainingTodos={todos.length} />
    </div>
  );
};

export default Todo;
