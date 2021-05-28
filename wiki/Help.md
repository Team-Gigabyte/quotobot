# The Official Guide for Quotobot
## Use the prefix `~` or mention the bot (the bot works in DMs too)
## List of Commands:
(capitalization doesn't matter)
- `randomquote`, `randquote`, `rquote`, `quote`: Prints a random quote
- `shortquote`, `longquote`: Prints a short or long quote respectively. The short quote will be ≤140 characters, and you can click the header to Tweet the quote.
- `ping`: Prints "Pong!"
- `weather`: Gets the weather. All of these commands work, assuming the prefix is `~`:
  - `~weather New York` (prints in metric)
  - `~weather imperial Mexico City`
  - `~weather metric Paris,us` (gets the weather for Paris in the US, not the one in France)
  - `~weather Arlington,va,us` (gets the weather for Arlington in Virginia, not the one in Texas)
  - You'll need to wait some time between weather queries (at the moment, it's 2 seconds for our host)
- `stock ABCD`, `stocks ABCD`: Pulls up the stock price for whatever stock (in this example, ABCD).
  - Note that non-US stocks and CFD indices (such as `^N225`) aren't supported.
  - Clicking the title of the bot's message will take you to Yahoo! Finance for that stock.
  - You'll need to wait some time between stock queries (at the moment, it's 2 seconds for our host)
  - The data and timestamp are not guaranteed to be 100% accurate, so don't trade based on the info the bot returns.
- `amiadmin`: Returns if you have the administrator permission in the current server. (Doesn't work in a DM, although you can try.)
- `league`, `lol`, `lolstats` or `leaguestats`: Returns some stats for a certain League user. For example, assuming the prefix is `~`:
  - `~leaguestats ExampleSummoner JP` (JP is equivalent to jp1)
  - `~leaguestats Some1234Summoner` (defaults to NA)
  - `~leaguestats Multiworded+summoner` (looks up `Multiworded summoner`)
  - You'll need to wait some time between League queries (at the moment, it's 5 seconds for our host)



| Region | Equivalent to (the bot doesn't accept these) |
|:--------:|---------------|
| KR     |               |
| BR1    |               |
| OCE    | oc1           |
| JP     | jp1           |
| NA     | na1           |
| EUNE   | eun1          |
| EUW    | euw1          |
| TR     | tr1           |
| LAN    | la1           |
| LAS    | la2           |
| RU | |

- `help`: Brings up a hyperlink to this commands list

- ~~`spellcheck`: Returns all the spelling mistakes in the text following this command and suggestions for what the correct word may be.~~
  - ~~Example, assuming the prefix is `~`: `~spellcheck helo ther, this is realy mispeled.`~~
  - ~~There's a limit of 500 characters.~~
  - ~~Currently this command only supports English (United States). Leave a GitHub issue if you want to see another language in the future.~~