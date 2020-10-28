<h1 align="center">Quotobot</h1>
<p align="center">A Discord bot that displays 200+ hand-curated quotes, tells you the weather, fetches stock info, and more!</p>

[![Discord Bots](https://top.gg/api/widget/746889272992464958.svg)](https://top.gg/bot/746889272992464958)
[![Click to invite to your server](https://img.shields.io/static/v1?label=Invite%20to&message=your%20server&color=7289DA&logo=Discord)](http://quotobot.ml) 
[![Number of quotes](https://img.shields.io/badge/dynamic/yaml?color=blue&label=quotes&query=%24.count&url=https%3A%2F%2Fraw.githubusercontent.com%2FTeam-Gigabyte%2Fquotobot%2Fmaster%2Fdb%2Fquotes.count.yml)](https://github.com/Team-Gigabyte/quotobot/blob/master/db/quotes.db.csv)


![CI](https://github.com/Team-Gigabyte/quotobot/workflows/CI/badge.svg) 
[![DeepScan grade](https://deepscan.io/api/teams/10906/projects/13838/branches/243095/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=10906&pid=13838&bid=243095) 
[![DeepSource](https://deepsource.io/gh/Team-Gigabyte/quotobot.svg/?label=active+issues)](https://deepsource.io/gh/Team-Gigabyte/quotobot/?ref=repository-badge)
[![GitHub license](https://img.shields.io/github/license/Team-Gigabyte/quotobot)](https://github.com/Team-Gigabyte/quotobot/blob/master/LICENSE) 
![Program Size](https://img.shields.io/github/languages/code-size/Team-Gigabyte/quotobot) 
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/Team-Gigabyte/quotobot?logo=github&sort=semver)](https://github.com/Team-Gigabyte/quotobot/releases/latest) 


![Quotes screenshot](https://raw.githubusercontent.com/Team-Gigabyte/quotobot/master/img/Demo%20Picture.png)
![Weather screenshot](https://raw.githubusercontent.com/Team-Gigabyte/quotobot/master/img/Weather%20Demo.png)
![Stock screenshot](https://raw.githubusercontent.com/Team-Gigabyte/quotobot/master/img/Stock%20Demo.png)


# 🤖 [INVITE THE BOT TO YOUR SERVER!](http://quotobot.ml)
## 🤔 [Need to see a list of commands? Click here.](../../wiki/Help)
## 👇 [Click here to skip the next section](#tentative-timeline)
# Or do you want to host and tweak the bot yourself?
## How to set up the config.json
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
<details open> 
    
<summary>More info about the APIs.</summary>
    
You can add an [OpenWeatherMap API key](https://openweathermap.org/guide#how), [Finnhub (stocks) key](https://finnhub.io), and a [Riot key](https://developer.riotgames.com/) in the same way. OpenWeatherMap and Finnhub are free and easy to get, but Riot needs you to submit an application to get a key. If any of these keys are missing, the bot won't crash – it'll just let the user know that the feature isn't working if they try to use it.
</details>

You can also change the status that the bot shows (it'll be prefixed with *Watching*, though) by changing the `help-domain-example` to `help-domain` and adding your text in the value for that. Example complete config file:
```json
{
    "prefix": "&&",
    "token": "abcdrkhjregjl.efghfioeigtj",
    "help-domain": "my-bot-site.qb",
    "clientID": "12343546798",
    "permissionValue": 0,
    "weather-token": "1jf920fk3",
    "weatherTimeout": 2000,
    "stockToken": "FinnhubKey92323032",
    "stockTimeout": 2000,
    "riotKey": "RGAPI-199020190912091",
    "leagueTimeout": 3000
}
```
The timeouts are optional and set in milliseconds.
## Environment Variables instead of `config.json`
Instead of using the config.json, you can set these environment variables:
```bash
QBTOKEN="YourTokenHere"
QBPREFIX=">>" # optional, default ~
QBWEATHER="WeatherKey103949"
QBWTIMEOUT="2000" # optional, default 15000 (15 seconds)
QBSTOCKS="FinnhubKey92323032"
QBSTIMEOUT="2000" # optional, default 2000 (2 seconds) or QBWTIMEOUT if that is set
QBRGKEY="RGAPI-199020190912091"
QBLEAGUETIMEOUT="3000" # optional, default 5000 (5 seconds)
```
Note that there is currently no way to change stuff like the client ID this way.
## Run the bot
Make sure you have [Node.js >= 12](https://nodejs.org/) installed and open a command prompt/terminal in the folder where these files are. Then run:
```bash
npm install
node index.js
```
Press <kbd>Control</kbd> + <kbd>C</kbd> (even on a Mac) to stop the bot.
## Run as a Docker container
- [Do the config.json stuff listed above.](#how-to-set-up-the-configjson)
- Build the image:
```
docker build -t quotobot/quotobot .
```
- Run this command to start the container:
```
docker run --name quotobot1 -d -v ./config.json:/app/config.json quotobot/quotobot
```
## Heroku notes
For Heroku, use the [environment variables setup](#environment-variables-instead-of-configjson) (it's called *config vars* in Heroku). You'll probably need to turn off the web dyno and turn on the worker dyno.
## Keeping your copy up to date
If you used the `git clone` command to download the bot, just do 
```bash
git pull origin
``` 
to update. If you want to switch to the version you had before, you can use
```bash
git checkout tags/v2.1.2
```
and replace 2.1.2 with whatever [version](https://github.com/Team-Gigabyte/quotobot/releases) you want. Then, to switch back to the latest code, use
```bash
git checkout master
```
We follow semver, so as long as the first number in the digit is the same as your old release, you shouldn't have to change anything to make the new release work.
## Adding quotes
- Don't modify anything in the quotes.db.csv or the .sql files, since those are auto-generated dumps.
### Bulk CSV method (recommended)
You can do all of this from the GitHub web interface.
1. Put your quotes in db/newQuotes.csv (the first column has the quote, the second is the author). Make sure the first column doesn't say what the columns are.
    - Make sure to not put a space between the fields.
    ```csv
    "This is wrong.", "Example Person"
    "This is right.","Example Person"
    ```
2. Go [here](https://github.com/Team-Gigabyte/quotobot/actions?query=workflow%3A%22CSV+convert%22) (link will be different if you're working on a fork) and click Run Workflow. Use the workflow from the master branch.
3. After that's done (assuming there aren't any errors), check if the quotes are in db/quotes.db.csv. If they are, get rid of the quotes in newQuotes.csv.
### JS method (not recommended; sometimes doesn't work)
<details>
    <summary>
        <b>Click here to see instructions.</b>
    </summary>

- Use the addQuote.js script, which will prompt you for the required info and add it to db/quotes.db.
- Make sure to make your quotes the *last* commits before you push, otherwise you'll get merge conflicts.
You can also take a look at the csvToDb.py file and experiment with that. (You'll need Python and SQLite for that, and you need to modify the file name in the script.)

</details>

**Special thank you to [Uddesh](https://github.com/UddeshJain)**

We used part of his [weather bot code](https://github.com/UddeshJain/Discord-Weather-Bot) and modified it for our project.

# Tentative Timeline
~~Publish v1.0 of the bot: **August 30** (by the latest): **70+ QUOTES! The quotes will be nice and embedded!**~~

Future releases of the bot: **We might periodically add more quotes and features, including general features unrelated to quotes! This is not certain to happen as school will restart and time to work on this project will be limited.**

Any pull requests are appreciated.

# Future Updates
- League of Legends Player Lookup/Stats
- Steam Features: Playercount, Price History, etc.

# Technical Notes
![Built with JS](https://img.shields.io/static/v1?label=built%20with&message=JS&color=yellow&logo=javascript)

This bot mainly uses Node.js and Discord.js. The quotes are stored in an SQLite database and accessed using the `sqlite3` module. The weather comes from OpenWeatherMap. (Ignore the quotes-legacy.json file, as the code doesn't use JSON for the quotes anymore. If you want to see the quotes without using SQLite, take a look at the quotes.db.csv file.)

# Donate?
[![Donate today](https://img.shields.io/static/v1?label=donate&message=today&color=green)](https://github.com/Team-Gigabyte/donate)

Thank you for reading to the end. If you learned something from the bot, or have enjoyed using it, please consider donating [here](https://github.com/Team-Gigabyte/donate). All donations help us continue maintain this, which we have spent countless hours working on. **Thank you!**
