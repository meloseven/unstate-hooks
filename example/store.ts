import createStore from "../src";
const initData = {
  number: 0,
  theme: 'black',
};
export default createStore(initData, true);
