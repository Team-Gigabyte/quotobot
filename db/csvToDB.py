import csv
import sqlite3
db = sqlite3.connect("quotes.db")
with open('message.txt') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    for row in csv_reader:
        db.cursor().execute(
            "insert into Quotes(quote, id, source, usage) values(?,?,?,?)",
            (row[0], row[1], row[2], 0))
        line_count += 1
    print(f'Processed {line_count} lines.')