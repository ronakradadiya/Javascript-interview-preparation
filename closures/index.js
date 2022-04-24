// closure example

function x() {
  var a = 7;
  function y() {
    console.log(a);
  }
  // a = 100;
  return y;
}

var z = x();
z();


// closure example 1

function y() {
  console.log('Start of function');
  var i = 1;
  setTimeout(() => {
    console.log(i);
  }, 3000)
  console.log('End of function');
}

y();


// closure example 2

function z1() {
  console.log('Start of function');
  var i = 1;
  setTimeout(() => {
    console.log(i);
  }, 0)
  console.log('End of function');
}

z1();

// closure example 3

function z2() {
  for (var i = 1; i <=5; i++ ) {
    setTimeout(() => {
      console.log(i);
    }, i*1000)
  }
}

z2();

// solution for closure example 3: part 1

function z2Solution1() {
  for (let i = 1; i <=5; i++ ) {
    setTimeout(() => {
      console.log(i);
    }, i*1000)
  }
}

z2Solution1();

// solution for closure example 3: part 2

function z2Solution2() {
  for (var i = 1; i <=5; i++ ) {
    function close(j) {
      setTimeout(() => {
        console.log(j);
      }, j * 1000)
    }
    close(i)
  }
}

z2Solution2();