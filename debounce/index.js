
const getData = (e) => {
  console.log('fetching...')
}

const debounce = (cb, ms) => {
  let timer;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb();
    }, ms)
  }
}

const betterFunction = debounce(getData, 500);