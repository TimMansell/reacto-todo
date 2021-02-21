import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { editTodo, deleteTodo, completedTodo } from '../store/todoStore';
import PropTypes from 'prop-types';

export const TodoListItem = ({ todo }) => {
  const [edit, setEdit] = useState(false);
  const refEdit = useRef(null);
  const dispatch = useDispatch();

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

  const handleEdit = (e) => {
    const item = {
      ...todo,
      text: refEdit.current.value,
    };

    e.preventDefault();

    if (!item) {
      return;
    }

    dispatch(editTodo(item));

    setEdit(false);
  };

  return (
    <li className="flex p-1">
      <div className="flex-1">
        <div className={classString}>
          <label>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(completedTodo(todo.key))}
            />
            <span>{todo.text}</span>
          </label>
        </div>

        <span className={editTaskClass}>
          <form onSubmit={(e) => handleEdit(e)}>
            <input type="text" ref={refEdit} defaultValue={todo.text} />
          </form>
        </span>
      </div>
      <div>
        <button
          className="p-2 bg-blue-500 text-white rounded-md"
          title="Edit Task"
          onClick={() => setEdit(!edit)}
        >
          Edit
        </button>
        <button
          className="p-2 bg-red-600 text-white rounded-md ml-1"
          title="Remove Task"
          onClick={() => dispatch(deleteTodo(todo.key))}
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
