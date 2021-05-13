import React, { useRef } from "react";

import "./AddTodo.scss";

import { firestore } from "../../Firebase/firebase";

const AddTodo = () => {
  const addTodoLoading = useRef();

  const addTodoToDB = async (e) => {
    const formEle = e.target;
    e.preventDefault();

    const [todoName] = formEle.elements;

    if (todoName.value.length === 0) {
      return;
    }

    const objToStore = {
      todoName: todoName.value,
    };

    addTodoLoading.current.style.display = "block";
    console.log(todoName.value);

    // Add to do to the database
    await firestore
      .collection("todos")
      .doc()
      .set(objToStore)
      .then(() => {
        // Successfully added
        formEle.reset();
        console.log("created");
      })
      .catch((err) => console.err(err));

    addTodoLoading.current.style.display = "none";
  };

  const addFocus = (e) => {
    /*
    Here if input element is focussed then 
    we add the styles to the span if its parent
    doesn't contains styles already.
    */
    const parent = e.target.parentNode;

    if (!parent.classList.contains("focussed")) {
      parent.classList.add("focussed");
    }
  };

  const removeFocus = (e) => {
    /*
      Here if focus removed from the input
      then we remove the styles from the span
      if input value length is 0 otherwise will
      not do anything.
    */
    const parent = e.target.parentNode;
    const inputText = parent.children[1].value;

    if (inputText.length === 0) {
      parent.classList.remove("focussed");
    }
  };

  return (
    <div className="add-todo">
      <h1 className="heading">Add item to your todo list</h1>

      <form
        onSubmit={(e) => {
          addTodoToDB(e);
        }}
      >
        <div className="inputItem">
          <span>Enter task</span>
          <input
            onFocus={(e) => addFocus(e)}
            onBlur={(e) => removeFocus(e)}
            type="text"
          />
        </div>
        <input type="submit" style={{ display: "none" }} />
      </form>
      <div ref={addTodoLoading} className="add-todo-loading"></div>
    </div>
  );
};
export default AddTodo;
