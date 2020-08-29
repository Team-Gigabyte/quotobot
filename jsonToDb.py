#!/usr/bin/env python3
import sqlite3
import json
data = json.load(open("quotes.json"))
db = sqlite3.connect("quotes2.db")
count = 0
for q in data["Thomas Jefferson"]:
    count += 1
    db.cursor().execute("insert into Quotes(quote, id, source, usage) values('" +q+"}', "+str(count)+", 'Thomas Jefferson', 0)")
#print(data["Thomas Jefferson"])
db.commit()
db.close()
