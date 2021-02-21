import React from 'react';

export const TodoRemoveAllItems = () => {
  const handleClick = () => {
    localStorage.setItem('todoItem', JSON.stringify([]));
  };

  return (
    <div className="text-center">
      <br />
      <button
        className="p-2 bg-red-600 text-white rounded-md"
        onClick={() => handleClick()}
      >
        Remove All
      </button>
    </div>
  );
};

export default TodoRemoveAllItems;
