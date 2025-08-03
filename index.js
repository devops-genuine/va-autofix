const _ = require('lodash');

const data = { user: { name: "Jesada" } };
const cloned = _.cloneDeep(data);

console.log("Cloned:", cloned);
