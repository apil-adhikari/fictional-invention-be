// // modules.exports = singleValue => to export one single value.

// class Calculator {
//   add(a, b) {
//     return a + b;
//   }

//   multiply(a, b) {
//     return a * b;
//   }

//   subtract(a, b) {
//     return a - b;
//   }
// }

// module.exports = Calculator;

// Directly exporting the class
module.exports = class {
  add(a, b) {
    return a + b;
  }
  multiply(a, b) {
    return a * b;
  }
  divide(a, b) {
    return a / b;
  }
  subtract(a, b) {
    return a - b;
  }
};
