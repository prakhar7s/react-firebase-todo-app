import React from "react";

import "./TodoItem.scss";

import { firestore } from "../../Firebase/firebase";

// Icons
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";

const TodoItem = (props) => {
  const { todoName, important, id } = props.todo;

  const todoDocRef = firestore.collection("todos").doc(id);

  const changeImportance = () => {
    /*
      Every todo doc contains one variable called
      important which is used to indicate important
      todos.

      Here we are updating that variable.

      If that variable is not present in that doc
      then it will automatically create that and assign 
      false to it. 

    */
    todoDocRef
      .update({
        important: !important,
      })
      .then(() => {
        // console.log("importance updated");
      })
      .catch((err) => console.error(err));
  };

  const deleteTodo = async () => {
    /*
      This is function deletes the todo permanently
      from the firestore.
    */

    await todoDocRef
      .delete()
      .then(() => {
        // console.log("todo deleted");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className={`todo-item${important ? " imp" : ""}`}>
      <header>
        <div className="options">
          <div onClick={changeImportance} className="option">
            <StarBorderRoundedIcon />
          </div>

          <div onClick={deleteTodo} className="option">
            <DeleteForeverRoundedIcon />
          </div>
        </div>
      </header>
      <section>
        <h1 className="todo-name">{todoName}</h1>
      </section>
    </div>
  );
};

export default TodoItem;
