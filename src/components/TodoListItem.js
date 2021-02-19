import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
          : [];

    const newItems = items.map((item) => {
      if (item.key === todo.key) {
        return todo;
      }

      return item;
    });

    // Update item.
    localStorage.setItem('todoItem', JSON.stringify(newItems));

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
          : [];

    const newItems = items.filter((item) => item.key !== todo.key);

    // Save to localStorage.
    localStorage.setItem('todoItem', JSON.stringify(newItems));
  }

  render() {
    let todo = this.props.todo,
      classString = '',
      editTaskClass = 'hidden';

    // Has the task been completed?
    if (this.props.todo.completed) {
      classString = 'line-through';
    }

    if (this.state.data.edit) {
      editTaskClass = '';
      classString += ' hidden';
    }

    return (
      <li className="flex p-1">
        <div className="flex-1">
          <div className={classString}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                ref={this.setTaskInputRef}
                onChange={() => this.handleChange()}
              />
              <span>{todo.text}</span>
            </label>
          </div>

          <span className={editTaskClass}>
            <form onSubmit={(e) => this.handleEditSubmit(e)}>
              <input
                type="text"
                ref={this.setEditInputRef}
                defaultValue={todo.text}
              />
            </form>
          </span>
        </div>
        <div>
          <button
            className="p-2 bg-blue-500 text-white rounded-md"
            title="Edit Task"
            onClick={() => this.editTodo()}
          >
            Edit
          </button>
          <button
            className="p-2 bg-red-600 text-white rounded-md ml-1"
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
