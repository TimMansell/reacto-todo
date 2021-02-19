import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoBox extends Component {
  constructor(props) {
    super(props);

    this.textInput = null;

    this.setTextInputRef = (element) => {
      this.textInput = element;
    };
  }

  handleSubmit(e) {
    let todo = this.textInput.value,
      key = Math.floor(Math.random() * 10000) + 1;

    e.preventDefault();

    if (!todo) {
      return;
    }

    // Save new todo.
    this.props.onTodoSubmit({ key: key, text: todo, completed: false });

    this.textInput.value = '';
  }

  render() {
    return (
      <div className="text-center">
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input
            type="text"
            className="rounded"
            placeholder="What would you like to do?"
            ref={this.setTextInputRef}
          />
        </form>
      </div>
    );
  }
}

TodoBox.propTypes = {
  onTodoSubmit: PropTypes.func.isRequired,
};

export default TodoBox;
