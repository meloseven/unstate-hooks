import React from "react";
import store from "./store";
const { useStore } = store;
export default function Demo() {
  const { data, update } = useStore();
  const { number } = data;
  return (
    <div>
      {number}
      <button onClick={() => update({ number: number + 1 })}>+</button>
      <button onClick={() => update({ number: number - 1 })}>-</button>
    </div>
  );
}
