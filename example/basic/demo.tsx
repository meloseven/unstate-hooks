import React from "react";
import store from "./store";
const { useStoreBy } = store;
export default function Demo() {
  const { data, update } = useStoreBy('number');
  return (
    <div>
      {data}
      <button onClick={() => update(data + 1)}>+</button>
      <button onClick={() => update(data - 1)}>-</button>
    </div>
  );
}
