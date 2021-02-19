import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TodoListItem from './TodoListItem';

class TodoList extends Component {
  render() {
    let todoNodes = this.props.todos;

    if (todoNodes.length) {
      todoNodes = this.props.todos.map(function (todo, index) {
        return <TodoListItem key={index} todo={todo} />;
      });
    } else {
      todoNodes = 'No todos.';
    }

    return (
      <div>
        <h3>Items to do</h3>
        <ul>{todoNodes}</ul>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
};

export default TodoList;
