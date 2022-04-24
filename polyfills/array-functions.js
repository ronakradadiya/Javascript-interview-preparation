// Polyfill for map

// Structure: Array.map((currentValue, i, arr) => {})

Array.prototype.myMap = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
}

console.log([1,2,3].myMap(num => num * 2));

// Polyfill for filter

// Structure: Array.filter((currentValue, i, arr) => {})

Array.prototype.myFilter = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
}

console.log([1,2,3].myFilter(num => num % 2 === 0));

// Polyfill for reduce

// Structure: Array.reduce((acc, currentValue, i, arr) => {}, initialValue)

Array.prototype.myReduce = function(callback, initialValue) {
  let result = initialValue;
  for (let i = 0; i < this.length; i++) {
    result = callback(result, this[i], i, this);
  }
  return result;
}

console.log([1,2,3].myReduce((acc, num) => acc + num, 0));