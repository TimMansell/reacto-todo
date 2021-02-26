import React from 'react';
import PropTypes from 'prop-types';

import TodoListItem from './TodoListItem';

export const TodoList = ({ todos }) => {
  const todoNodes = () => {
    if (todos.length) {
      return todos.map(function (todo, index) {
        return <TodoListItem key={index} todo={todo} />;
      });
    } else {
      return 'No todos.';
    }
  };

  return (
    <div>
      <h3>Items to do</h3>
      <ul>{todoNodes()}</ul>
    </div>
  );
};

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
};

export default TodoList;
