const sqlite3 = require("sqlite3");
const db = new sqlite3.Database('./db/quotes.db');
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question("What is the quote? ", function (qt) {
    rl.question("Who wrote it? ", function (src) {
        db.each("SELECT * FROM Quotes ORDER BY id DESC limit 1;", function (error, row) {
            if (error) { console.error(error) }
            db.run(`INSERT INTO Quotes(quote, id, source, usage) VALUES(?,?,?,?)`,
                [qt, row.id + 1, src, 0], function (error) {
                    if (error) { console.error(error) }
                    else { console.log("Added quote!") }
                }
            );//SELECT * FROM Quotes ORDER BY id ASC limit 1;
            rl.close();
        });
    });
});