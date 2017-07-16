import React, { Component } from 'react';

import TodoListItem from './TodoListItem';

class TodoList extends Component {
  render() {
    let todoNodes = this.props.todos;

    if(todoNodes.length){
        todoNodes = this.props.todos.map(function (todo, index) {
          return (
            <TodoListItem key={index} todo={todo}/>
          );
        });
    } else {
        todoNodes = "No todos.";
    }

    return (
        <div>
            <h3>Items to do</h3>
            <ul className="list-unstyled">
                {todoNodes}
            </ul>
        </div>
    );
  }
}

export default TodoList;
