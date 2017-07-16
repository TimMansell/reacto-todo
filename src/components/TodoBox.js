import React, { Component } from 'react';

class TodoBox extends Component {
  handleSubmit = (e) => {
      let todo = this.refs.todo.value,
          key = Math.floor(Math.random() * 10000) + 1;

      e.preventDefault();

      
      if (!todo) {
        return;
      }
      
      // Save new todo.
      this.props.onTodoSubmit({key: key, text: todo, completed: false});

      this.refs.todo.value = '';
  }
  
  render() {
      return (
        <form className="todo-form" onSubmit={this.handleSubmit}>
            <input className="form-control" type="text" placeholder="What would you like to do?" ref="todo"/>
        </form>
      );
  }
}

export default TodoBox;
