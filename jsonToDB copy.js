const sl3 = require("sqlite3").verbose();
const sqlite = require("sqlite");
const q = require("./quotes.json")["Thomas Jefferson"];
console.log(q);
// Quotes(quote text not null, id int not null primary key, source text not null, usage int not null)
/* let db = new sl3.Database('./quotes.db', sl3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
}); */
const db = undefined;
(async () => {
    db = await open({
      filename: '/tmp/database.db',
      driver: sqlite3.cached.Database
    })
})()
let count = 10;
q.forEach( (key) => {
    (async () => {
        count++;
    await db.exec(`insert into Quotes(quote, id, source, usage) values('${key}', ${count}, 'Thomas Jefferson', 0)`);
    })()
    
})
/* for (const key in q) {
    count++;
    db.run(`insert into Quotes(quote, id, source, usage) values('${key}', ${count}, 'Thomas Jefferson', 0)`);
} */
(async () => {
    await db.close();
})()