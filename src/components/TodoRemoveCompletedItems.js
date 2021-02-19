import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { filter } from 'lodash';

class TodoRemoveCompletedItems extends Component {
  handleClick() {
    let items =
        localStorage.getItem('todoItem') !== null
          ? JSON.parse(localStorage.getItem('todoItem'))
          : [],
      itemsCompleted;

    // Find all uncompleted items.
    itemsCompleted = filter(items, { completed: false });

    // Save to localStorage uncompleted items..
    localStorage.setItem('todoItem', JSON.stringify(itemsCompleted));

    return;
  }

  render() {
    return (
      <div className="text-center">
        <br />
        <span className={this.props.remainingTodos ? '' : 'hidden'}>
          <button
            className="p-2 bg-green-500 text-white rounded-md"
            onClick={this.handleClick}
          >
            Clear Completed
          </button>
        </span>
      </div>
    );
  }
}

TodoRemoveCompletedItems.propTypes = {
  remainingTodos: PropTypes.number.isRequired,
};

export default TodoRemoveCompletedItems;
