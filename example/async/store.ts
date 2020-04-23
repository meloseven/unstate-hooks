import createStore from "../../src";
import { getList, IData, addOne, removeOne } from "./api";
import { useEffect } from "react";

export interface IStoreData {
  list: IData[];
}
const initData: IStoreData = {
  list: []
};
const store = createStore(initData, true);

export const useStoreByList = () => {
  const [data, update] = store.useStoreBy("list");
  useEffect(() => {
    getList().then(res => {
      update(res);
    });
  }, [update]);
  const addData = () => {
    addOne().then(res => {
      update(res);
    });
  }
  const removeData = () => {
    removeOne().then(res => {
      update(res);
    });
  }
  return {
    data,
    addData,
    removeData
  };
};

export default store;
