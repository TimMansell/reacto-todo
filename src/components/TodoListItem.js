import React, { Component } from 'react';

import { indexOf, find } from 'lodash';

class TodoListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        edit: false
      }
    };
  }

  handleChange = (e) => { 

      // Swap checked state.
      this.props.todo.completed = !this.props.todo.completed;

      this.saveTodo();
    }

    saveTodo(){
        let todo = this.props.todo,
            items = (localStorage.getItem('todoItem')!==null) ? JSON.parse(localStorage.getItem('todoItem')) : [],
            index;

        // Find current item in items array.
        index = indexOf(items, find(items, {key: todo.key}));

        // Update item.
        items.splice(index, 1, todo);

        // Save to localStorage.
        localStorage.setItem('todoItem', JSON.stringify(items));

        // this.setState({data: {edit: false}});

        this.setState(prevState => ({
            data: {edit: false}
        }));

        return;
    }

    editTodo = () => {
        // this.setState({data: {edit: !this.state.data.edit}});

        this.setState(prevState => ({
          data: {edit: !this.state.data.edit}
      }));
    }

    handleEditSubmit = (e) => { 
        let todo = this.refs.editTodoInput.value;

        e.preventDefault();
        
        if (!todo) {
          return;
        }

        this.props.todo.text = todo;

        this.saveTodo();
    }

    removeTodo = () => {
        let todo = this.props.todo,
            items = (localStorage.getItem('todoItem')!==null) ? JSON.parse(localStorage.getItem('todoItem')) : [],
            index;

        // Find current item in items array.
        index = indexOf(items, find(items, {key: todo.key}));

        // Update item.
        items.splice(index, 1);

        console.log('items', items);

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
            classString = 'todo-item_done';
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
                      <input className="todo-item-checkbox" type="checkbox" checked={todo.completed} ref="task" onChange={this.handleChange}/>
                      <span className={classString}>{todo.text}</span>
                  </label>
              </div>
              
              <span className={editTaskClass}>
                  <form className="todo-form" onSubmit={this.handleEditSubmit}>
                      <input className="form-control" type="text" ref="editTodoInput" defaultValue={todo.text}/>
                  </form>
              </span>
              <div className="todo-item-options">
                  <button className="todo-item-option" title="Edit Task" onClick={this.editTodo}>Edit</button>
                  <button className="todo-item-option" title="Remove Task" onClick={this.removeTodo}>Remove</button>
              </div>
          </li>
        );
    }
}

export default TodoListItem;
