const sqlite3 = require("sqlite3");
const db = new sqlite3.Database('./db/quotes.db');
db.get("Select Count(*) from Quotes", (err, row) => {
    if (err) { console.error(err.message); }
    return row ? console.table(row) : console.log("Nothing found.");
})