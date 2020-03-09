import React from "react";
import { Grid, IGridColumn, Button } from "zent";
import { useStoreByList } from "./store";
import { IData } from "./api";

const columns: IGridColumn<IData>[] = [
  { title: "标题", name: "title" },
  { title: "修改时间", name: "updatedAt" },
  { title: "修改人", name: "operatorName" },
  { title: "发布时间", name: "publishTime" }
];

export default function Demo() {
  const { data, addData, removeData } = useStoreByList();
  return (
    <div>
      <br />
      异步DEMO示例：
      <br />
      <Button onClick={addData}>增加一行数据</Button>
      <Button onClick={removeData}>减少一行数据</Button>
      <Grid columns={columns} datasets={data} />
    </div>
  );
}
