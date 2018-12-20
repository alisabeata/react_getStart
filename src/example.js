export const sum = (a, b) => a + b;

export const pushToArray = (arr, item) => [...arr, item];

export const promiseTimeout = (fn, timeout) => 
  new Promise(resolve => {
    setTimeout(() => {
      resolve(fn());
    }, timeout);
  });

export const multipl = (a, b) => a * b;