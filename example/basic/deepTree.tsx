import React, { useMemo, useEffect } from "react";
import store from "./store";
const { useStoreBy } = store;
export default function Demo(props: any) {
  const [obj, setObj] = useStoreBy('deepObj');
  useEffect(() => {
    console.log('2')
    setObj({
      ...obj,
      y: 6
    })
  }, [setObj])
  const handleClick = () => {
    setObj({
      ...obj,
      y: 4,
    })
  }
  return (
    <div onClick={handleClick}>
      {
        obj.y
      }
    </div>
  );
}
