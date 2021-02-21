import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

export const TodoListItem = ({ todo }) => {
  const [edit, setEdit] = useState(false);
  const refInput = useRef(null);
  const refEdit = useRef(null);

  let classString = '',
    editTaskClass = 'hidden';

  // Has the task been completed?
  if (todo.completed) {
    classString = 'line-through';
  }

  if (edit) {
    editTaskClass = '';
    classString += ' hidden';
  }

  const handleChange = () => {
    const updatedTodo = {
      ...todo,
      completed: !todo.completed,
    };

    saveTodo(updatedTodo);
  };

  const saveTodo = (updatedTodo) => {
    let items =
      localStorage.getItem('todoItem') !== null
        ? JSON.parse(localStorage.getItem('todoItem'))
        : [];

    console.log({ updatedTodo });

    const newItems = items.map((item) => {
      if (item.key === updatedTodo.key) {
        return updatedTodo;
      }

      return item;
    });

    // Update item.
    localStorage.setItem('todoItem', JSON.stringify(newItems));

    setEdit(false);
  };

  const editTodo = () => setEdit(!edit);

  const handleEditSubmit = (e) => {
    const editTodo = {
      ...todo,
      text: refEdit.current.value,
    };

    e.preventDefault();

    if (!editTodo) {
      return;
    }

    saveTodo(editTodo);
  };

  const removeTodo = () => {
    let items =
      localStorage.getItem('todoItem') !== null
        ? JSON.parse(localStorage.getItem('todoItem'))
        : [];

    const newItems = items.filter((item) => item.key !== todo.key);

    // Save to localStorage.
    localStorage.setItem('todoItem', JSON.stringify(newItems));
  };

  return (
    <li className="flex p-1">
      <div className="flex-1">
        <div className={classString}>
          <label>
            <input
              type="checkbox"
              checked={todo.completed}
              ref={refInput}
              onChange={() => handleChange()}
            />
            <span>{todo.text}</span>
          </label>
        </div>

        <span className={editTaskClass}>
          <form onSubmit={(e) => handleEditSubmit(e)}>
            <input type="text" ref={refEdit} defaultValue={todo.text} />
          </form>
        </span>
      </div>
      <div>
        <button
          className="p-2 bg-blue-500 text-white rounded-md"
          title="Edit Task"
          onClick={() => editTodo()}
        >
          Edit
        </button>
        <button
          className="p-2 bg-red-600 text-white rounded-md ml-1"
          title="Remove Task"
          onClick={() => removeTodo()}
        >
          Remove
        </button>
      </div>
    </li>
  );
};

TodoListItem.propTypes = {
  todo: PropTypes.object.isRequired,
};

export default TodoListItem;
