# hooks 状态管理库

## 说明

hooks状态管理有利于再FC中更好的去管理全局状态，数据更多的是全局通用数据，如果只在组件内使用的数据，请使用`useState`。

## 开始

```js
import createStore from 'unstate-hooks';
```

## API一览

```js
const store = createStore(data)
const { Provider, useStore, useStoreBy } = store;
```

<b style="color: red">推荐使用useStoreBy，对性能更好。</b>

## 使用

以下是最简单的一个例子，可以在任何`Provider`包裹的元素中使用`useStore`

store.ts

```js
import createStore from 'unstate-hooks';
const initData = {
  number: 0
};
export default createStore(initData, true);
```

index.tsx

```js
import store from "./store";
import Demo from './demo';
const { Provider } = store;

ReactDOM.render(
  <Provider>
    <Demo />
  </Provider>,
  document.getElementById("root")
);
```

demo.tsx

```js
import store from "./store";
const { useStoreBy } = store;
export default function Demo() {
  const [ data, update ] = useStoreBy('number');
  return (
    <div>
      {data}
      <button onClick={() => update(data + 1)}>+</button>
      <button onClick={() => update(data - 1)}>-</button>
    </div>
  );
}
```

## 开启 debug

`createStore`函数第二个参数为是否开启 debug 模式，设置`true`可在打印台查看数据变化

```js
createStore(initData, true);
```

## useStoreBy和useStore的区别

用法上，`useStoreBy`是对单个对象属性的操作，更新会重新渲染订阅到该属性的地方，而`useStore`是对整个对象的操作，更新会重新渲染所有用到`useStore`和`useStoreBy`的地方

## 如何扩展useStoreBy

你可以用`useStoreBy`去扩展任何你想做的，可以包装暴露更多的`action`，把很多公用的业务代码抽离出来，形成更好复用，更加优雅的方式。例如下面自定义的useStore。

```js
const useStoreWithActions = function() {
  const [ data, update ] = useStoreBy('number');
  const increment = () => {
    update(data + 1)
  }
  const decrement = () => {
    update(data - 1)
  }
  return {
    data,
    increment,
    decrement
  }
}
```

## 异步DEMO

[异步demo](https://github.com/meloseven/unstate-hooks/tree/master/example/async)

## context和memo问题

因为`store`的`data`是定义在`context`里，但是`context`的存在一个已知问题：
>useContext doesn't let you subscribe to a part of the context value (or some memoized selector) without fully re-rendering

这种情况先考虑官方提供的解法: https://github.com/facebook/react/issues/15156#issuecomment-474590693。`useMemo`可以用`context`的部分值作为dependency，所以memo本身没有问题，而是组件无法只订阅部分`context`的值。
> this Hook will trigger a rerender with the latest context value passed to that MyContext provider. Even if an ancestor uses React.memo or shouldComponentUpdate, a rerender will still happen starting at the component itself using useContext.

类似与官方的推荐做法，我们现在的做法是：`createStore`默认会根据传入的对象拆解，生成多个`context`，以达到更好的性能效果。
