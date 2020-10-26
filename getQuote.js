const { promisify } = require("util");
const sqlite3 = require("sqlite3");
const db = new sqlite3.cached.Database("./db/quotes.db", sqlite3.OPEN_READONLY);
db.each = promisify(db.each);
const randQuoteQuery = "SELECT quote, source FROM Quotes WHERE id IN (SELECT id FROM Quotes ORDER BY RANDOM() LIMIT 1);";
module.exports = async () => {
    const { quote, source } = await db.each("SELECT quote, source FROM Quotes WHERE id IN (SELECT id FROM Quotes ORDER BY RANDOM() LIMIT 1);");
    return { quote, source };
}