import csv
import sqlite3
db = sqlite3.connect("quotes.db")
getID = db.cursor().execute("SELECT id FROM Quotes ORDER BY id DESC LIMIT 1;")
lastID = 0
for row in getID:
    lastID = row[0]
with open('./newQuotes.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    for row in csv_reader:
        print(row)
        db.cursor().execute(
            "insert into Quotes(quote, id, source, usage) values(?,?,?,?);",
            (row[0], lastID + 1, row[1], 0))
        line_count += 1
        lastID += 1
    print(f'Added {line_count} quotes.')
db.commit()
db.close()
