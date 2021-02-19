import React, { Component } from 'react';

import TodoBox from './TodoBox';
import TodoRemoveAllItems from './TodoRemoveAllItems';
import TodoList from './TodoList';
import TodoRemoveCompletedItems from './TodoRemoveCompletedItems';

class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  loadTodos() {
    let todos = JSON.parse(localStorage.getItem('todoItem')) || [];

    this.setState(() => ({
      data: todos,
    }));
  }

  componentDidMount() {
    this.loadTodos();

    // Poll for any new todos.
    setInterval(() => this.loadTodos(), 60);
  }

  handleTodoSubmit(todo) {
    let items =
      localStorage.getItem('todoItem') !== null
        ? JSON.parse(localStorage.getItem('todoItem'))
        : [];

    // Add new item to array.
    items.push(todo);

    // Save to localStorage.
    localStorage.setItem('todoItem', JSON.stringify(items));
  }

  render() {
    return (
      <div className="todo">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <h1 className="todo-title text-center">React Todo</h1>
            <p className="text-center">
              Type in a task below. Hit enter to save.
            </p>
            <TodoBox onTodoSubmit={(todo) => this.handleTodoSubmit(todo)} />
            <TodoRemoveAllItems />
            <TodoList todos={this.state.data} />
            <TodoRemoveCompletedItems remainingTodos={this.state.data.length} />
          </div>
        </div>
      </div>
    );
  }
}

export default Todo;
