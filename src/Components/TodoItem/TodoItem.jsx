import React from "react";

import "./TodoItem.scss";

const TodoItem = (props) => {
  const { todoName } = props.todo;

  return (
    <div className="todo-item">
      <h1 className="todo-name">{todoName}</h1>
    </div>
  );
};

export default TodoItem;
