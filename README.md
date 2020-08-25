# Quotobot
A Discord bot that tells quotes!

[![Node.js CI](https://github.com/ssharker21/quotobot/workflows/Node.js%20CI/badge.svg)](https://github.com/ssharker21/quotobot/actions)

# [INVITE THE BOT TO YOUR SERVER!](http://quotobot.ml)
[Invite Link](http://quotobot.ml)

## Or do you want to host and tweak the bot yourself?

### How to set up the config.json
- Make a copy of config-example.json and call it config.json. 

- Change the prefix if you like (keep it inside the quotes). 

- **Where it says *"your-token-here"*, paste in your token (also inside the quotes).** 

- If you want the bot to output its invite link, change
```json
"clientID-example": "123456789012347",
```
to
```json
"clientID": "123456789012347",
```
You can also change the help domain that's shown in the bot status in the same way.
making sure to change the number to your client ID inside the quotes.
### Run the bot
Make sure you have NodeJS installed and open a command prompt/terminal in the folder where these files are. Then run:
```bash
npm install
node index.js
```
### Tentative Timeline
Publish v1.0.1 of the bot: **August 27** (by the latest): **100+ QUOTES! The quotes will be nice and embedded!**

Publish v.1.0.x of the bot: **We might periodically add more quotes and features, including general features unrelated to quotes! There is no deadline as school will restart and time to work on this project will be limited.**

- [ ] Convert the quotes.json to an SQLite database
- [ ] Add weather command
- [ ] Find the means to host the bot (and maybe auto-deploy)
- [ ] Make and host a quote REST API that could be used in other bots
- [ ] Modularize the [command code](https://discordjs.guide/command-handling/#dynamically-reading-command-files)