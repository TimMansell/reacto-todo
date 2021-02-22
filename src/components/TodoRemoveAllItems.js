import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodos } from '../store/todo';

export const TodoRemoveAllItems = () => {
  const dispatch = useDispatch();

  return (
    <div className="text-center">
      <br />
      <button
        className="p-2 bg-red-600 text-white rounded-md"
        onClick={() => dispatch(deleteTodos())}
      >
        Remove All
      </button>
    </div>
  );
};

export default TodoRemoveAllItems;
