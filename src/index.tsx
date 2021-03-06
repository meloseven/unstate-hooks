import React, {
  useContext,
  Dispatch,
  SetStateAction,
  useLayoutEffect,
  useState,
  useCallback
} from "react";
import { isEqual } from "lodash";

export type IStore<T> = [T, (value: Partial<T>) => void];
export type IStoreBy<T, K extends keyof T> = [T[K], (value: T[K]) => void]

export interface ICommonObject {
  [key: string]: any;
}

interface ISingeProviderProps<K> {
  name: K;
  children: React.ReactNode;
}

const NO_PROVIDER = "__NP__" as any;

export default function createStore<T extends ICommonObject>(
  initialData: T,
  debug?: boolean
) {
  if (typeof initialData !== "object") {
    throw new Error(
      `[unstate hooks]please use data of object type, but now is ${typeof initialData}`
    );
  }

  const contextMap = new Map<keyof T, React.Context<T[keyof T]>>();
  const setterMap = new Map<keyof T, Dispatch<SetStateAction<keyof T>>>();
  const valueMap = new Map<keyof T, T[keyof T]>();
  const dataKeys = Object.keys(initialData);
  dataKeys.forEach(item => {
    contextMap.set(item, React.createContext<T[keyof T]>(NO_PROVIDER));
  });

  const SingleProvider = function(props: ISingeProviderProps<keyof T>) {
    const { name } = props;
    const [data, setter] = useState(initialData[name]);
    const context = contextMap.get(name);
    useLayoutEffect(() => {
      setterMap.set(name, setter);
      valueMap.set(name, data);
    }, [data, setter]);
    return <context.Provider value={data}>{props.children}</context.Provider>;
  };

  const Provider = function(props: any) {
    let children = props.children;
    dataKeys.forEach(name => {
      children = <SingleProvider name={name}>{children}</SingleProvider>;
    });
    return children;
  };

  const useStoreBy = function<K extends keyof T>(key: K) : IStoreBy<T, K>{
    let data: T[K];
    if (key) {
      data = useContext(contextMap.get(key)) as T[K];
    }
    if (data === NO_PROVIDER) {
      console.warn("[unstate-hooks]Component not wrapper with Provider");
    }
    return [
      data,
      useCallback((value: T[K]) => {
        let newData: T[keyof T];
        if (Array.isArray(value)) {
          newData = [...(value as [])] as T[keyof T];
        } else if (typeof value === "object") {
          newData = { ...value };
        } else {
          newData = value;
        }

        /* if (debug) {
          console.log("[unstate hooks] useStoreBy: old data", data);
          console.log("[unstate hooks] useStoreBy: new data", newData);
        } */
        //if (!isEqual(newData, data)) {
          const setter = setterMap.get(key);
          setter(newData);
        //}
      }, [])
    ];
  };

  const useStore = function(): IStore<T> {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        '[unstate hooks] for better performance, wo recommand to ues "useStoreBy"'
      );
    }
    const stores = new Map<string, IStoreBy<T, keyof T>>();
    const data: any = {};
    dataKeys.forEach(key => {
      const store = useStoreBy(key);
      stores.set(key, store);
      data[key] = store[0];
    });
    return [
      data,
      (value: Partial<T>) => {
        if (typeof value !== "object") {
          throw new Error(
            `[unstate hooks] useStore: please use data of object type, but now is ${typeof value}`
          );
        }
        const newData = Object.assign({}, data, { ...value });
        if (debug) {
          console.log("[unstate hooks] useStore: old data", data);
          console.log("[unstate hooks] useStore: new data", newData);
        }
        if (!isEqual(newData, data)) {
          stores.forEach(([_, update], key) => {
            update(newData[key]);
          });
        }
      }
    ];
  };

  return {
    Provider,
    useStoreBy,
    useStore
  };
}
