<h1 align="center">Quotobot</h1>
<p align="center"><i>(KWO-toe-bot)</i><br/> An open source Discord bot that displays 200+ hand-curated quotes, tells you the weather, fetches stock and League info, and more!</p>

[![top.gg stats](https://top.gg/api/widget/746889272992464958.svg)](https://top.gg/bot/746889272992464958)

[![Click to invite to your server](https://img.shields.io/static/v1?label=Invite%20to&message=your%20server&color=7289DA&logo=Discord)][inv]
[![Number of quotes](https://img.shields.io/badge/dynamic/yaml?color=blue&label=quotes&query=%24.count&url=https%3A%2F%2Fraw.githubusercontent.com%2FTeam-Gigabyte%2Fquotobot%2Fmaster%2Fdb%2Fquotes.count.yml)](https://github.com/Team-Gigabyte/quotobot/blob/master/db/quotes.db.csv)


![CI](https://github.com/Team-Gigabyte/quotobot/workflows/CI/badge.svg) 
[![DeepScan grade](https://deepscan.io/api/teams/10906/projects/13838/branches/243095/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=10906&pid=13838&bid=243095) 
[![DeepSource](https://deepsource.io/gh/Team-Gigabyte/quotobot.svg/?label=active+issues)](https://deepsource.io/gh/Team-Gigabyte/quotobot/?ref=repository-badge)
[![GitHub license](https://img.shields.io/github/license/Team-Gigabyte/quotobot)](https://github.com/Team-Gigabyte/quotobot/blob/master/LICENSE) 
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/Team-Gigabyte/quotobot?logo=github&sort=semver)](https://github.com/Team-Gigabyte/quotobot/releases/latest) 


![Quotes screenshot](https://raw.githubusercontent.com/Team-Gigabyte/quotobot/master/img/Demo%20Picture.png)

![Weather screenshot](https://raw.githubusercontent.com/Team-Gigabyte/quotobot/master/img/Weather%20Demo.png)

![Stock screenshot](https://raw.githubusercontent.com/Team-Gigabyte/quotobot/master/img/Stock%20Demo.png)


# 🤖 [INVITE THE BOT TO YOUR SERVER!][inv]
## 🤔 [Need to see a list of commands? Click here.](../../wiki/Help) <sub>([Alternate Link](https://github.com/Team-Gigabyte/quotobot/wiki/Help))</sub>
## 👨‍💻 [Do you want to host and tweak the bot yourself? Click here.](../../wiki/Hosting) <sub>([Alternate Link](https://github.com/Team-Gigabyte/quotobot/wiki/Hosting))</sub>

# Technical Notes
![Built with JS](https://img.shields.io/static/v1?label=built%20with&message=JS&color=yellow&logo=javascript)

This bot mainly uses Node.js and Discord.js. The quotes are stored in an SQLite database and accessed using the `sqlite3` module. The weather comes from [OpenWeatherMap](https://openweathermap.org/), stock data comes from [Finnhub](https://finnhub.io/), and League stats come from the [official Riot API](https://developer.riotgames.com/). (If you want to see the quotes without using SQLite, take a look at the [quotes.db.csv](./db/quotes.db.csv) file.)

# Acknowledgements
Thank you to:
* [Uddesh](https://github.com/UddeshJain). We used part of his [weather bot code](https://github.com/UddeshJain/Discord-Weather-Bot) and modified it for our project.
* The maintainers of all the open source NPM packages we use.
* Riot Games, for approving our API key.
  * This bot isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.
* The OpenWeatherMap and Finnhub APIs, which power some of the bot functions.
* [Material Design Icons](https://materialdesignicons.com/), for the quote icon we used to make the bot's logo.
* All the contributors to this project.

# Contribute
Any pull requests are appreciated. If you want to add quotes, you can follow [the quote-adding process](https://github.com/Team-Gigabyte/quotobot/wiki/Hosting#bulk-csv-method-recommended) on a fork, but only do step 1 and submit the pull request. Or, if you have problems with that process, open a GitHub issue with the quote, author, and a source (website that has the quote).
# License
This project is licensed under the [MIT](https://github.com/Team-Gigabyte/quotobot/blob/master/LICENSE). You can use it for pretty much anything as long as you credit us.
However, if you use the quotes from our database, you must put credit in the same place where you display the quote.
# Donate?
[![Donate today](https://img.shields.io/static/v1?label=donate&message=today&color=green)](https://github.com/Team-Gigabyte/donate)

Thank you for reading to the end. If you learned something from the bot, or have enjoyed using it, please consider donating [here](https://github.com/Team-Gigabyte/donate). All donations help us continue maintain this, which we have spent countless hours working on. **Thank you!**

[inv]: https://discord.com/oauth2/authorize?client_id=746889272992464958&permissions=280576&scope=bot
