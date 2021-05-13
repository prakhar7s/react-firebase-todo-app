import React, { useRef } from "react";

import "./AddTodo.scss";

import { firestore } from "../../Firebase/firebase";

const AddTodo = (props) => {
  const addTodoLoading = useRef();

  const addTodoToDB = async (e) => {
    const formEle = e.target;
    e.preventDefault();

    const [todoName, HH, MM, SS] = formEle.elements;
    const time = `${HH.value}:${MM.value}:${SS.value}`;

    if (todoName.value.length === 0) {
      return;
    }

    const objToStore = {
      todoName: todoName.value,
      time,
    };

    addTodoLoading.current.style.display = "grid";
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
    props.history.push("all-todos");
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

        <div className="input-time">
          <div className="inputItem">
            <span>HH</span>
            <input
              onFocus={(e) => addFocus(e)}
              onBlur={(e) => removeFocus(e)}
              type="number"
              max="23"
              min="0"
              maxLength="2"
            />
          </div>
          <div className="inputItem">
            <span>MM</span>
            <input
              onFocus={(e) => addFocus(e)}
              onBlur={(e) => removeFocus(e)}
              type="number"
              max="59"
              min="0"
              maxLength="2"
            />
          </div>
          <div className="inputItem">
            <span>SS</span>
            <input
              onFocus={(e) => addFocus(e)}
              onBlur={(e) => removeFocus(e)}
              type="number"
              max="59"
              min="0"
              maxLength="2"
            />
          </div>
        </div>

        <input type="submit" style={{ display: "none" }} />
      </form>
      <div ref={addTodoLoading} className="add-todo-loading">
        <div className="loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};
export default AddTodo;
