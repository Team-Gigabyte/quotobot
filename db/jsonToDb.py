#!/usr/bin/env python3
import sqlite3
import json
data = json.load(open("quotes.json"))
db = sqlite3.connect("quotes2.db")
source = "Scarlet Pimpernel by Baroness Orczy"
for count, q in enumerate(data[source], start=68):
    #db.cursor().execute("insert into Quotes(quote, id, source, usage) values('" +q+"}', "+str(count)+", 'George Washington', 0)")
    db.cursor().execute("insert into Quotes(quote, id, source, usage) values(?,?,?,?)",(q, count, source, 0))
#print(data["Thomas Jefferson"])
db.commit()
db.close()