import React, { useMemo } from "react";
export default function Demo(props: any) {
  console.log('2')
  return (
    <div>
      deep tree, {props.color}
    </div>
  );
}
