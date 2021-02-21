import React, { useRef } from 'react';
import PropTypes from 'prop-types';

export const TodoBox = ({ onTodoSubmit }) => {
  const refInput = useRef(null);

  const handleSubmit = (e) => {
    let todo = refInput.current.value,
      key = Math.floor(Math.random() * 10000) + 1;

    e.preventDefault();

    if (!todo) {
      return;
    }

    // Save new todo.
    onTodoSubmit({ key: key, text: todo, completed: false });

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

TodoBox.propTypes = {
  onTodoSubmit: PropTypes.func.isRequired,
};

export default TodoBox;
