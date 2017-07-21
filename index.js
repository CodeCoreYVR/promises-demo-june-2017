/* eslint-disable */
// P R O M I S E S

// When creating a promise, use the Promise constructor
// that requires a callback (named executor sometimes resolver)
// which will be called with two functions: resolve & reject.
new Promise ((resolve, reject) => {
  if (false /* something bad happens */) {
    // To "throw an error" inside a promise, use the `reject` function with
    // the error as its argument.
    reject(new Error('Oops!'));
  }

  const resolveValue = 'It worked!';
  // To "return" a value from a promise, call the `resolve` function
  // with the value as its argument. This is the *resolved value* of the
  // promise.
  resolve(resolveValue);
});

// DEMO: Flipping Coins
/*
function flipCoin () {
  return new Promise((resolve, reject) => {
    const side = ['heads', 'tails'][Math.floor(Math.random() * 2)];
    resolve(side);
  });
};
*/
// 👇 flipCoin written with a callback instead of with a Promise 👆

function flipCoinWithCb (cb) {
  const side = ['heads', 'tails'][Math.floor(Math.random() * 2)];
  if (typeof cb === 'function') cb(side);
};

// EXERCISE: Roll Die
function random (number) {
  return Math.ceil(Math.random() * number);
}

function rollDie(number) {
  return new Promise(function (res, rej) {
    res(random(number));
  });
}

// DEMO: Throwing the Coin Too Far
function flipCoin () {
  return new Promise((resolve, reject) => {
    // A promise can only resolve or reject once
    // whichever is called first will give the promise its final
    // value, then change the state of the promise from `pending`
    // to `resolved` or to `rejected`.
    setTimeout(() => {
      const side = ['heads', 'tails'][random(2) - 1];
      resolve(side);
    }, 1000 + random(3000));

    setTimeout(() => {
      reject('The coin was thrown too far!');
    }, 5000);
  });
};

// Using a Promise

// To get the resolved value (shown as [[PromiseValue]] in Chrome) from a promise
// object, use the `.then` method when the promise status is `resolved` or
// use the `.catch` method when the promise status is `rejected`.

// `.then` & `.catch` always return promise allowing to chain `.then` after
// `.then` after `.then` equally so for `.catch`.

// The resolved value of the next `.then`'s callback will the return value
// the previous `.then`'s callback.

/*
flipCoin()
.then(firstValue => {
  console.log('firstValue:', firstValue);
  return 10
})
.then(secondValue => {
  // Because the callback above returns 10, secondValue
  // will be 10
  console.info('secondValue:', secondValue);
  return flipCoin()
})
.then(thirdValue => {
  // Because the callback above returns the promise of flipCoin
  // thirdValue will be the [[PromiseValue]] of flipCoin.
  console.info('thirdValue:', thirdValue);
})
.catch(console.info)


flipCoin()
.then(firstValue => {
  console.log('firstValue:', firstValue);
  return flipCoin()
    .then(secondValue => {
      console.info('secondValue:', secondValue);
      return flipCoin()
        .then(thirdValue => {
          console.info('thirdValue:', thirdValue);
          return flipCoin()
        })
    })
})
.catch(console.error)
*/

// DEMO: Create a delay function

// Promisify setTimeout. We're converting the setTimeout function to work
// as a promise instead.
/*
function delay (ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), ms);
  });
}
*/

// Example Usage:

delay(1000)
.then(() => {
  console.log('Waited 1s!')
  // If you want the next `.then` to wait for the return promise
  // to resolve before executing its callback, you *MUST* return it.
  // Otherwise, the next `.then` will run immediately with `undefined`.
  return delay(2000)
})
.then(() => {
  console.log('Waited another 2s!')
})

// EXERCISE: Upgrade Delay
function delay (ms, value) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.info('time:', ms, 'value:', value);
      resolve(value);
    }, ms);
  });
}

// 🎩
function delayWith (ms, value) {
  if (typeof value === 'undefined') {
    return result => new Promise((resolve, reject) => {
      setTimeout(() => resolve(result), ms);
    });
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(value), ms);
  });
}

// Promise Utility Methods

// Promise.resolve immediately returns a promise that is resolved with an argument
Promise.resolve(20) // returns promise that resolved with PromiseValue 20
// 👆 shortcut for 👇
new Promise((resolve, reject) => resolve(20));

// Promise.reject immediately returns that is rejected with an argument
Promise.reject(20) // returns promise that rejected with PromiseValue 20
// 👆 shortcut for 👇
new Promise((resolve, reject) => reject(20));

// Promise.all

function sequentialDemo () {
  console.time('sequentialDemo total time');
  delay(1000 + random(2000), 10)
    .then(() => delay(1000 + random(2000), 20))
    .then(() => delay(1000 + random(2000), 30))
    .then(() => delay(1000 + random(2000), 40))
    .then(() => delay(1000 + random(2000), 50))
    .then(() => { console.timeEnd('sequentialDemo total time'); })
}

function parallelDemo () {
  console.time('parallelDemo total time');
  Promise.all([
    delay(1000 + random(2000), 10),
    delay(1000 + random(2000), 20),
    delay(1000 + random(2000), 30),
    delay(1000 + random(2000), 40),
    delay(1000 + random(2000), 50)
  ])
    .then(arrOfResolvedValues => {
      console.timeEnd('parallelDemo total time');
      console.log(arrOfResolvedValues)
    })
}

// Async Function
// async functions are were added to JavaScrip in ES2017. They're fully supported
// in Node 7.6+ and Node 8+.
// async functions are functions are declared prefixed with the keyword `async`.
// async functions can treat promise as regular values if they're prefixed
// with the word `await`

async function MyAsyncFn () {};
const My2ndAsyncFn = async function () {};
const MyAsyncArrow = async () => {};

async function asyncSequentialDemo () {
  console.time('asyncSequentialDemo total time');
  const results = [
    await delay(1000 + random(2000), 10),
    await delay(1000 + random(2000), 20),
    await delay(1000 + random(2000), 30),
    await delay(1000 + random(2000), 40),
    await delay(1000 + random(2000), 50)
  ]
  console.timeEnd('asyncSequentialDemo total time');

  console.log(results);
  return results;
}











/* */
