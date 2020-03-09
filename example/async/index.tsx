import React from "react";
import ReactDOM from "react-dom";
import store from "./store";
import Demo from './demo';
const { Provider } = store;

ReactDOM.render(
  <Provider>
    <Demo/>
  </Provider>,
  document.getElementById("root")
);
