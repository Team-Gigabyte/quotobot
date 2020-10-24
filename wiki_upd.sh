#!/bin/bash
CURRWD=$(pwd)
mkdir -p ~/wikitemp
cd ~/wikitemp
git clone https://github.com/Team-Gigabyte/quotobot.wiki .
for i in *.md; do cat i > $CURRWD/wiki/i; done
