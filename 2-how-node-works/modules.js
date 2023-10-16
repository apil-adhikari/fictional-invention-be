// console.log(arguments);
// console.log(require("module").wrapper);

// module.exports
const { type } = require("os");
const C = require("./test-module-1");

const calc1 = new C();
console.log(typeof C);
console.log(calc1.add(1, 5));

// exports
// const calc2 = require("./test-modules-2");

// Destructuring only the required properties
const { add, multiply, divide } = require("./test-modules-2");
console.log(multiply(1, 5));
console.log(add(1, 5));

// Caching
require("./test-modules-3")();
require("./test-modules-3")();
require("./test-modules-3")();
