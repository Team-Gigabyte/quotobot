# Quotobot
A Discord bot that tells quotes, gets the weather, and more!

[![Node.js CI](https://github.com/ssharker21/quotobot/workflows/Node.js%20CI/badge.svg)](https://github.com/ssharker21/quotobot/actions)  [![GitHub license](https://img.shields.io/github/license/ssharker21/quotobot)](https://github.com/ssharker21/quotobot/blob/master/LICENSE)  [![Click to invite to your server](https://img.shields.io/static/v1?label=Invite%20to&message=your%20server&color=7289DA&logo=Discord)](http://quotobot.ml)
![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/ssharker21/quotobot?logo=github&sort=semver)
![Quotes screenshot](https://user-images.githubusercontent.com/25331232/91901407-2e907c00-ec6e-11ea-96a7-e7d8dc3ada8a.png)


# [INVITE THE BOT TO YOUR SERVER!](http://quotobot.ml)

### Special thank you to [Uddesh](https://github.com/UddeshJain)
We used part of his [weather bot code](https://github.com/UddeshJain/Discord-Weather-Bot) and modified it for our project.

## Or do you want to host and tweak the bot yourself?

### How to set up the config.json
- Make a copy of config-example.json and call it config.json. 

- Delete the entire line with `"instructions"` if you want to.

- Change the prefix if you like (keep it inside the quotes). 

- **Where it says `"your-token-here"`, paste in your Discord bot token (also inside the quotes).**

- If you want the bot to output its invite link on startup, change
```json
"clientID-example": "123456789012347",
```
to
```json
"clientID": "123456789012347",
```

making sure to change the number to your client ID inside the quotes.

Add an [OpenWeatherMap API key](https://openweathermap.org/guide#how) (the free plan is really generous) in the same way. 

You can also change the status that the bot shows (it'll be prefixed with *Watching*, though) by changing the `help-domain-example` to `help-domain` and adding your text in the value for that. Example complete config file:
```json
{
    "prefix": "&&",
    "token": "abcdrkhjregjl.efghfioeigtj",
    "help-domain": "my-bot-site.qb",
    "clientID": "12343546798",
    "permissionValue": 0,
    "weather-token": "1jf920fk3"
}
```
### Environment Variables instead of `config.json`
Instead of using the config.json, you can set these environment variables:
```bash
QBTOKEN="YourTokenHere"
QBPREFIX=">>" # optional, default ~
QBWEATHER="WeatherKey103949"
```
Note that there is currently no way to change stuff like the client ID and the bot status this way.
### Run the bot
Make sure you have NodeJS installed and open a command prompt/terminal in the folder where these files are. Then run:
```bash
npm install
node index.js
```
Press <kbd>Control</kbd> + <kbd>C</kbd> (even on a Mac) to stop the bot.
### Adding quotes
- Use the addQuote.js script, which will prompt you for the required info and add it to db/quotes.db.
- Don't modify anything in the .csv or the .sql files, since those are auto-generated dumps.
- Make sure to make your quotes the *last* commits before you push, otherwise you'll get merge conflicts.
You can also take a look at the csvToDb.py file and experiment with that. (You'll need Python and SQLite for that, and you need to modify the file name in the script.)
### Tentative Timeline
~~Publish v1.0 of the bot: **August 30** (by the latest): **70+ QUOTES! The quotes will be nice and embedded!**~~

Future releases of the bot: **We might periodically add more quotes and features, including general features unrelated to quotes! This is not certain to happen as school will restart and time to work on this project will be limited.**

Any pull requests are appreciated.
## Technical Notes
This bot mainly uses Node.js and Discord.js. The quotes are stored in an SQLite database and accessed using the `sqlite3` module. The weather comes from OpenWeatherMap. (Ignore the quotes-legacy.json file, as the code doesn't use JSON for the quotes anymore. If you want to see the quotes without using SQLite, take a look at the quotes.db.csv file.)
