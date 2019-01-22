var Benchmark = require('benchmark');

function fiboLoop(num){
    var a = 1, b = 0, temp;
  
    while (num > 0){
      temp = a;
      a = a + b;
      b = temp;
      num--;
    }
  
    return b;
  }
  
  function fiboRecursive(num) {
    if (num < 2) return num;
    return fiboRecursive(num - 1) + fiboRecursive(num - 2);
  }
  
  function fiboMemo(num, memo) {
    memo = memo || {};
  
    if (memo[num]) return memo[num];
    if (num < 2) return num;
  
    return memo[num] = fiboMemo(num - 1, memo) + fiboMemo(num - 2, memo);
  }

  // https://en.wikipedia.org/wiki/Fibonacci_sequence
  function fiboFormula(n) {
    var phi = (Math.sqrt(5) + 1) / 2.0;
    return Math.round(Math.pow(phi, n) / Math.sqrt(5));
  }
  
  function runFibs(num){
    console.log('start');
    console.time('fiboLoop');
    console.time('fiboRecursive');
    console.time('fiboMemo');
    console.time('fiboForm');
    var loop = fiboLoop(num);
    var rec = fiboRecursive(num);
    var mem = fiboMemo(num);
    var form = fiboFormula(num);
   
    if (loop != undefined){console.log('done', loop)};
    if (rec != undefined){console.log('done', rec)};
    if (mem != undefined){console.log('done', mem)};
    if (form != undefined){console.log('done', form)};

    console.timeEnd('fiboLoop');
    console.timeEnd('fiboRecursive');
    console.timeEnd('fiboMemo');
    console.timeEnd('fiboForm');
  }

  var fiboNum = 20;

function benchmark(){
  var suite = new Benchmark.Suite;
  // add tests
suite.add('fiboLoop', function() {
   fiboLoop(fiboNum);
  })
  .add('fiboRecursive', function() {
    fiboRecursive(fiboNum);
  })
  .add('fiboMem', function() {
fiboMemo(fiboNum) })
  // add listeners
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({ 'async': true });
}

function bench(){
  exports.compare = {
    'loop' : function() {
      var x = fiboLoop(fiboNum);
    },
    'rec': function() {
        var x = fiboRecursive(fiboNum);
    },
    'mem': function() {
        var x = fiboMemo(fiboNum);
    },
    'form': function() {
        var x = fiboFormula(fiboNum);
    }
  }
  require("bench").runMain();
}
bench();
//runFibs(25);