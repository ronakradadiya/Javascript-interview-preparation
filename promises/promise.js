// Async and sync promise with multiple then, catch and fianlly block
class MyPromise {
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

  static resolve(data) {
    return new MyPromise((resolve, _reject) => {
      resolve(data);
    });
  }

  static reject(data) {
    return new MyPromise((_resolve, reject) => {
      reject(data);
    });
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

new MyPromise((resolve, reject) => {
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

MyPromise.resolve(10).then(data => console.log(data));
MyPromise.reject('Something went wrong').then(err => console.log(err));