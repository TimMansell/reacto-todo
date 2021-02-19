import React, { Component } from "react";

class TodoBox extends Component {
  constructor(props) {
    super(props);

    this.textInput = null;

    this.setTextInputRef = (element) => {
      this.textInput = element;
    };
  }

  handleSubmit = (e) => {
    let todo = this.textInput.value,
      key = Math.floor(Math.random() * 10000) + 1;

    e.preventDefault();

    if (!todo) {
      return;
    }

    // Save new todo.
    this.props.onTodoSubmit({ key: key, text: todo, completed: false });

    this.textInput.value = "";
  };

  render() {
    return (
      <form className="todo-form" onSubmit={this.handleSubmit}>
        <input
          className="form-control"
          type="text"
          placeholder="What would you like to do?"
          ref={this.setTextInputRef}
        />
      </form>
    );
  }
}

export default TodoBox;
