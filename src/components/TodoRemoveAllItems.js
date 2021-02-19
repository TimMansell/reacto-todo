import React, { Component } from 'react';

class TodoRemoveAllItems extends Component {
  handleClick() {
    localStorage.setItem('todoItem', JSON.stringify([]));
  }

  render() {
    return (
      <div className="text-center">
        <br />
        <button
          className="p-2 bg-red-600 text-white rounded-md"
          onClick={() => this.handleClick()}
        >
          Remove All
        </button>
      </div>
    );
  }
}

export default TodoRemoveAllItems;
