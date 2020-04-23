import React, { useMemo } from "react";
import store from "./store";
import DeepTree from './deepTree';
const { useStoreBy } = store;
export default function Demo() {
  const [ data ] = useStoreBy('theme');
  console.log('1')
  const color = useMemo(() => {
    console.log('color')
    if (data === 'black') {
      return '#000000';
    } else {
      return '#00ff00';
    }
  }, [data]);
  const child = useMemo(() => {
    return <DeepTree color={color}/>
  }, [color])
  return (
    <div>
      expensive tree
      {child}
    </div>
  );
}
