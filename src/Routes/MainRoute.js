import React from "react";
import { Route, Switch } from "react-router";

// Other Components
import AddTodo from "../Components/AddTodo/AddTodo";
import DisplayTodos from "../Components/DisplayTodos/DisplayTodos";

const MainRoute = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/add-todo" exact component={AddTodo} />
        <Route path="/all-todos" exact component={DisplayTodos} />
      </Switch>
    </React.Fragment>
  );
};

export default MainRoute;
