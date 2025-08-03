const _ = require('lodash');

function mergeUserOptions(userInput) {
  return _.merge({}, userInput);
}

// User-controlled input
const userInput = JSON.parse('{"__proto__": {"admin": true}}');
const result = mergeUserOptions(userInput);

console.log(result);