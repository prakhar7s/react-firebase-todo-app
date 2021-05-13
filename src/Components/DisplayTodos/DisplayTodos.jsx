import React, { useEffect, useState } from "react";
import { firestore } from "../../Firebase/firebase";
import TodoItem from "../TodoItem/TodoItem";

import "./DisplayTodos.scss";

const DisplayTodos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore.collection("todos").onSnapshot((todos) => {
      if (todos.docs.length) {
        const temp = todos.docs.map((todo) => ({
          ...todo.data(),
          id: todo.id,
        }));
        setTodos(temp);
      } else {
        //no todos
      }
    });

    /*
       Every time we fetch from firebase
      it open a new web socket connection
      so we can close that connection at
       unamounting of component.
    */
    return () => unsubscribe();
  }, []);

  return (
    <div className="display-todos">
      <h1 className="heading">Display Todo</h1>

      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};
export default DisplayTodos;
