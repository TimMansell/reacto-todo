import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../store/todo';

export const TodoBox = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    const key = Math.floor(Math.random() * 10000) + 1;

    e.preventDefault();

    if (!text) {
      return;
    }

    // Save new todo.
    dispatch(addTodo({ key, text, completed: false }));

    setText('');
  };

  return (
    <div className="text-center">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          className="rounded"
          placeholder="What would you like to do?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </form>
    </div>
  );
};

export default TodoBox;
