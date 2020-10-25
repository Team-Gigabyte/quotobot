#!/bin/bash
CURRWD=$(pwd)
mkdir -p ./wiki
mkdir -p ~/wikitemp
cd ~/wikitemp
git clone https://github.com/Team-Gigabyte/quotobot.wiki .
for i in *.md; do cp $i $CURRWD/wiki/$i; done