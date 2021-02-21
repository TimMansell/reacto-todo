import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../store/todoStore';

export const TodoBox = () => {
  const refInput = useRef(null);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    const text = refInput.current.value;
    const key = Math.floor(Math.random() * 10000) + 1;

    e.preventDefault();

    if (!text) {
      return;
    }

    // Save new todo.
    dispatch(addTodo({ key, text, completed: false }));

    refInput.current.value = '';
  };

  return (
    <div className="text-center">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          className="rounded"
          placeholder="What would you like to do?"
          ref={refInput}
        />
      </form>
    </div>
  );
};

export default TodoBox;
