# The Official Guide to Quotobot
## Use the prefix `~` or mention the bot (the bot works in DMs too)
## List of Commands so far:
(capitalization doesn't matter)
- `randomquote`, `randquote`, `rquote`, `quote`: Prints a random quote
- `shortquote`, `longquote`: Prints a short or long quote respectively. The short quote will be ≤140 characters, so it'll be similar to an older Tweet.
- `ping`: Prints "Pong!"
- `weather`: Gets the weather. All of these commands work, assuming the prefix is `~`:
  - `~weather New York` (prints in metric)
  - `~weather imperial Mexico City`
  - `~weather metric Paris,us` (tells it to get the weather for Paris in the US, not the one in France)
  - You'll need to wait some time between weather queries (at the moment, it's 2 seconds for our host)
- `stock ABCD`, `stocks ABCD`: Pulls up the stock price for whatever stock (in this example, ABCD). Note that CFD indices (such as `^N225`) aren't supported, and support for crypto prices and other stuff is in the works.
  - You'll need to wait some time between stock queries (at the moment, it's 2 seconds for our host)
- `amiadmin`: Returns if you have the administrator permission in the current server. (See what happens if you run it in a DM!)
- `leaguestats`: Returns the summoner level of a certain League user. For example, assuming the prefix is `~`:
  - `~leaguestats ExampleSummoner JP` (JP is equivalent to jp1)
  - `~leaguestats Some1234Summoner` (defaults to NA)
  - This feature may not be enabled yet.
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

- `help`: Brings up a hyperlink to this commands list