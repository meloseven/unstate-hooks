import createStore from "../../src";
const initData = {
  number: 0,
  theme: 'black',
  deepObj: {
    x: {
      m: 1,
    },
    y: 2
  }
};
export default createStore(initData, true);
