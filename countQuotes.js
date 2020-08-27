const q = require("./quotes.json");
let c = 0;
for (var key in q) {
    c += q[key].length;
}
console.log(c);