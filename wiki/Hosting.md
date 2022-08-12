# How To Host Quotobot
Advanced users not using Docker should use the [environment variable setup](#environment-variables-instead-of-configjson).
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

You can also change the status that the bot shows (it'll be prefixed with *Watching*, though) by changing the `help-domain-example` to `help-domain` (which will also be used by the Share to Twitter link) and adding your text in the value for that. Example complete config file:
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
Instead of using the config.json, you can set environment variables. See [the .env.example file](./.env.example) for the variable names and details.

You can also use a .env file to set environment variables. Just copy the lines you want to use (lines starting with `#` are ignored) into a file in this same folder called `.env`. If you use this method, don't keep a `config.json` file in the same folder.

Note that there is currently no way to change stuff like the client ID this way.
## Run the bot
Make sure you have [the latest LTS version of Node.js](https://nodejs.org/) installed and open a command prompt/terminal in the folder where these files are. Then run:
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
Note that the Dockerfile hasn't been tested so far.
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
We follow semver, so as long as the first number in the version number is the same as your old release, you shouldn't have to change anything to make the new release work.
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
