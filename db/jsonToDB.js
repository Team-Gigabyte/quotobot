const sqlite = require("sqlite3").verbose();
const util = require("util");
const q = require("./quotes.json")["Thomas Jefferson"];
// Quotes(quote text not null, id int not null primary key, source text not null, usage int not null)
let db = new sqlite.Database('./quotes.db', sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});
let count = 10;
db.run = util.promisify(db.run);
q.forEach(async key => {
    count++;
    await db.run(`insert into Quotes(quote, id, source, usage) values('${key}', ${count}, 'Thomas Jefferson', 0)`);
})
/* for (const key in q) {
    count++;
    db.run(`insert into Quotes(quote, id, source, usage) values('${key}', ${count}, 'Thomas Jefferson', 0)`);
} */
db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Close the database connection.');
});