// Async and sync promise with single then
class MyPromise {
  resolvedData;
  isResolved = false;
  thenFunc;

  constructor(executor) {
    const resolve = (value) => {
      this.resolvedData = value;
      this.isResolved = true;

      if (typeof this.thenFunc === "function") {
        this.thenFunc(this.resolvedData);
      }
    };

    executor(resolve);
  }

  then(fn) {
    this.thenFunc = fn;
    if (this.isResolved) {
      this.thenFunc(this.resolvedData)
    }
  }
}

// new MyPromise((resolve) => {
//   setTimeout(() => {
//     resolve(10);
//   }, 1000)
// }).then((data) => {
//   console.log(data);
// })

// Async and sync promise with single then and catch block
class MyPromise1 {
  resolvedData;
  isResolved = false;
  rejectedData;
  isRejected = false;
  thenFunc;

  constructor(executor) {
    const resolve = (value) => {
      this.resolvedData = value;
      this.isResolved = true;

      if (typeof this.thenFunc === "function") {
        this.thenFunc(this.resolvedData);
      }
    };

    const reject = (err) => {
      this.rejectedData = err;
      this.isRejected = true;
    }

    executor(resolve, reject);
  }

  then(fn) {
    this.thenFunc = fn;
    if (this.isResolved) {
      this.thenFunc(this.resolvedData)
    }
    return this;
  }

  catch(fn) {
    if (this.isRejected) {
      fn(new Error(this.rejectedData));
    }
  }
}

// new MyPromise1((resolve, reject) => {
//   // setTimeout(() => {
//   //   resolve(10);
//   // }, 1000)
//   reject("Server error...")
// }).then((data) => {
//   console.log(data);
// }).catch(err => console.log(err));

// Async and sync promise with multiple then, catch and fianlly block
class MyPromise2 {
  resolvedData;
  rejectedData;

  isResolved = false;
  isRejected = false;

  resolveChain = [];
  rejectChain = [];

  constructor(executor) {
    const resolve = (value) => {
      this.resolvedData = value;
      this.isResolved = true;

      if (this.resolveChain.length) {
        this.resolveChain.reduce((acc, fn) => {
          return fn(acc);
        }, this.resolvedData);
      }
    };

    const reject = (value) => {
      this.rejectedData = value;
      this.isRejected = true;

      if (this.rejectChain.length) {
        this.rejectChain.reduce((acc, fn) => {
          return fn(acc);
        }, this.rejectedData);
      }
    }

    executor(resolve, reject);
  }

  then(fn) {
    this.resolveChain.push(fn);
    if (this.isResolved) {
      this.resolveChain.reduce((acc, fn) => {
        return fn(acc);
      }, this.resolvedData);
    }
    return this;
  }

  catch(fn) {
    this.rejectChain.push(fn);
    if (this.isRejected) {
      this.rejectChain.reduce((acc, fn) => {
        return fn(acc);
      }, this.rejectedData);
    }
    return this;
  }

  finally(fn) {
    this.resolveChain.push(fn);
    this.rejectChain.push(fn);

    if (this.isResolved) {
      this.resolveChain.reduce((acc, fn) => {
        return fn(acc);
      }, this.resolvedData);
    }

    if (this.isRejected) {
      this.rejectChain.reduce((acc, fn) => {
        return fn(acc);
      }, this.rejectedData);
    }
  }
}

// new MyPromise2((resolve, reject) => {
//   // setTimeout(() => {
//   //   resolve(10);
//   // }, 1000)
//   // reject('Something wrong...');
//   resolve(10);
// }).then((data) => {
//   console.log('Inside then 1');
//   return data * 2;
// }).then((data) => {
//   console.log('Inside then 2');
//   return data * 2
// }).catch(err => new Error(err))
// .catch(err => err)
// .finally(data => console.log(data));

// Optimized Async and sync promise with multiple then, catch and fianlly block
class MyPromise3 {
  resolvedData;
  isResolved = false;
  resolveChain = [];

  rejectedData;
  isRejected = false;
  rejectChain = [];

  constructor(executor) {
    const resolve = (data) => {
      this.isResolved = true;
      this.resolvedData = data;

      if (this.resolveChain.length) {
        this.resolveChain.forEach(func => {
          this.resolvedData = func(this.resolvedData);
        })
      }
    }

    const reject = (data) => {
      this.isRejected = true;
      this.rejectedData = data;

      if (this.rejectChain.length) {
        this.rejectChain.forEach(func => {
          this.rejectedData = func(this.rejectedData);
        })
      }
    }

    executor(resolve, reject);
  }

  then(func) {
    if (this.isResolved) {
      this.resolvedData = func(this.resolvedData);
    } else {
      this.resolveChain.push(func);
    }
    return this;
  }

  catch(func) {
    if (this.isRejected) {
      this.rejectedData = func(this.rejectedData)
    } else {
      this.rejectChain.push(func);
    }
    return this;
  }

  finally(func) {
    if (this.isResolved) {
      this.resolvedData = func(this.resolvedData);
    } else {
      this.resolveChain.push(func);
    }

    if (this.isRejected) {
      this.rejectedData = func(this.rejectedData)
    } else {
      this.rejectChain.push(func);
    }
  }
}

new MyPromise3((resolve, reject) => {
  // setTimeout(() => {
  //   resolve(10);
  // }, 1000)
  reject('Something wrong...');
  // resolve(10);
}).then((data) => {
  console.log('Inside then 1');
  return data * 2;
}).then((data) => {
  console.log('Inside then 2');
  return data * 2
}).then((data) => {
  console.log('Inside then 3');
  console.log(data);
  return data;
})
.catch(err => {
  console.log('Inside catch 1');
  return new Error(err);
})
.catch(err => {
  console.log('Inside catch 2');
  return err;
})
.catch(err => {
  console.log('Inside catch 3');
  console.log(err);
  return err;
})
.finally(data => console.log(data));
