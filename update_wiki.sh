#!/bin/bash
CURRWD=$(pwd)
URL=$(git config --get remote.origin.url)
mkdir -p ~/wikitemp
cd ~/wikitemp
git clone $URL.wiki .
for i in *.md; do cat i > CURRWD/wiki/i; done
