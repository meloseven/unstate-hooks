const list: IData[] = [];
for (let i = 0; i < 10; i++) {
  list.push({
    id: i,
    title: `标题${i}`,
    updatedAt: "2019-04-07",
    operatorName: `修改人${i}`,
    publishTime: "2019-04-07"
  });
}

export interface IData {
  id: number;
  title: string;
  updatedAt: string;
  operatorName: string;
  publishTime: string;
}

export const addOne: () => Promise<IData[]> = () => {
  const i = list.length;
  list.push({
    id: i,
    title: `标题${i}`,
    updatedAt: "2019-04-07",
    operatorName: `修改人${i}`,
    publishTime: "2019-04-07"
  });
  return getList();
};

export const removeOne: () => Promise<IData[]> = () => {
  list.pop();
  return getList();
};

export const getList: () => Promise<IData[]> = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(list);
    }, 200);
  });
};
