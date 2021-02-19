import React, { Component } from 'react';

class TodoRemoveAllItems extends Component {
  handleClick() {
    localStorage.setItem('todoItem', JSON.stringify([]));
  }

  render() {
    return (
      <div className="row text-center">
        <br />
        <button className="btn btn-warning" onClick={() => this.handleClick()}>
          Remove All
        </button>
      </div>
    );
  }
}

export default TodoRemoveAllItems;
