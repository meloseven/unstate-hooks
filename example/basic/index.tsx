import React from "react";
import ReactDOM from "react-dom";
import store from "./store";
import Demo from './demo';
import Demo1 from './demo1';
import ExpensiveTree from './expensiveTree';
const { Provider } = store;

ReactDOM.render(
  <Provider>
    <div>
      <p>useStoreBy:</p>
      <Demo />
    </div>
    <div>
      <p>useStore:</p>
      <Demo1 />
    </div>
    <ExpensiveTree />
  </Provider>,
  document.getElementById("root")
);
