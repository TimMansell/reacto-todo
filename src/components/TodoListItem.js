import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { indexOf, find } from 'lodash';

class TodoListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        edit: false,
      },
    };

    this.taskInput = null;

    this.setTaskInputRef = (element) => {
      this.taskInput = element;
    };

    this.editInput = null;

    this.setEditInputRef = (element) => {
      this.editInput = element;
    };
  }

  handleChange() {
    // Swap checked state.
    this.props.todo.completed = !this.props.todo.completed;

    this.saveTodo();
  }

  saveTodo() {
    let todo = this.props.todo,
      items =
        localStorage.getItem('todoItem') !== null
          ? JSON.parse(localStorage.getItem('todoItem'))
          : [],
      index;

    // Find current item in items array.
    index = indexOf(items, find(items, { key: todo.key }));

    // Update item.
    items.splice(index, 1, todo);

    // Save to localStorage.
    localStorage.setItem('todoItem', JSON.stringify(items));

    // this.setState({data: {edit: false}});

    this.setState(() => ({
      data: { edit: false },
    }));

    return;
  }

  editTodo() {
    // this.setState({data: {edit: !this.state.data.edit}});

    this.setState(() => ({
      data: { edit: !this.state.data.edit },
    }));
  }

  handleEditSubmit(e) {
    let todo = this.editInput.value;

    e.preventDefault();

    if (!todo) {
      return;
    }

    this.props.todo.text = todo;

    this.saveTodo();
  }

  removeTodo() {
    let todo = this.props.todo,
      items =
        localStorage.getItem('todoItem') !== null
          ? JSON.parse(localStorage.getItem('todoItem'))
          : [],
      index;

    // Find current item in items array.
    index = indexOf(items, find(items, { key: todo.key }));

    // Update item.
    items.splice(index, 1);

    // Save to localStorage.
    localStorage.setItem('todoItem', JSON.stringify(items));
  }

  render() {
    let todo = this.props.todo,
      classString = '',
      checkboxClass = 'checkbox',
      editTaskClass = 'hidden';

    // Has the task been completed?
    if (this.props.todo.completed) {
      classString = 'todo-item-done';
    }

    if (this.state.data.edit) {
      editTaskClass = '';
      classString += ' hidden';
      checkboxClass += ' hidden';
    }

    return (
      <li className="todo-item">
        <div className={checkboxClass}>
          <label>
            <input
              className="todo-item-checkbox"
              type="checkbox"
              checked={todo.completed}
              ref={this.setTaskInputRef}
              onChange={() => this.handleChange()}
            />
            <span className={classString}>{todo.text}</span>
          </label>
        </div>

        <span className={editTaskClass}>
          <form
            className="todo-form"
            onSubmit={(e) => this.handleEditSubmit(e)}
          >
            <input
              className="form-control"
              type="text"
              ref={this.setEditInputRef}
              defaultValue={todo.text}
            />
          </form>
        </span>
        <div className="todo-item-options">
          <button
            className="todo-item-option"
            title="Edit Task"
            onClick={() => this.editTodo()}
          >
            Edit
          </button>
          <button
            className="todo-item-option"
            title="Remove Task"
            onClick={() => this.removeTodo()}
          >
            Remove
          </button>
        </div>
      </li>
    );
  }
}

TodoListItem.propTypes = {
  todo: PropTypes.object.isRequired,
};

export default TodoListItem;
