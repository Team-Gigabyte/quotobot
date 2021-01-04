#!/usr/bin/env node
"use strict";
// NPM modules and stuff
const Discord = require("discord.js");
const { env: envVars } = require("process");
const fetch = require("node-fetch");
const cFlags = require("country-flag-emoji");
const sqlite3 = require("sqlite3");
const { promisify } = require("util");
const { version: qbVersion } = require("./package.json");
const chalk = require("chalk");
let LeagueAPI = require("leagueapiwrapper");
const bot = new Discord.Client();
require("dotenv").config();
// config stuff
let configFile;
try {
    configFile = require("./config.json");
} catch (e) {
    if (e.code != "MODULE_NOT_FOUND") {
        throw e;
    }
    configFile = { "help-domain": "quotobot.js.org" };
}
let authorPictures, picturesEnabled;
try {
    authorPictures = require("./db/portraits.js");
    picturesEnabled = true;
} catch (e) {
    if (e.code !== "MODULE_NOT_FOUND") {
        throw e;
    }
    authorPictures = {};
    picturesEnabled = false;
    console.warn("Warning: No db/portraits.json file was found. Quotes will not have pictures of the author.")
}
let token = undefined;
if (configFile.token == "your-token-here-inside-these-quotes") {
    token = envVars.QBTOKEN;
} else if (!configFile.token) { token = envVars.QBTOKEN; }
else { token = configFile.token; } // uses env var if configFile.token isn't there or is the placeholder
// handle starting up the stocks API
let stocksEnabled = false;
if (configFile.stockToken || envVars.QBSTOCKS) {
    stocksEnabled = true;
}
if (!stocksEnabled) {
    console.log("Your stock API key is falsy (usually undefined). Stock lookups will not work.")
}
const helpDomain = envVars.QBSTATUS || configFile["help-domain"] || undefined;
// handle starting up the League API
let leagueEnabled = false;
try {
    if (!envVars.QBRGKEY && !configFile.riotKey) {
        throw new Error("The Riot key is falsy (usually undefined). Did you put a key?")
    }
    else {
        // eslint-disable-next-line no-undef
        LeagueAPI = new LeagueAPI(envVars.QBRGKEY || configFile.riotKey, Region.NA);
        LeagueAPI.initialize()
            .then(() => LeagueAPI.getStatus())
            .then(() => { leagueEnabled = true; })
            .catch(e => {
                console.error(chalk`{redBright ${e}}`);
                console.error(chalk`{redBright Due to the above error, League of Legends lookups won't work.}`);
            });
    }
}
catch (e) {
    console.error(chalk`{redBright ${e}}`);
    console.error(chalk`{redBright Due to the above error, League of Legends lookups won't work.}`);
}
// constants and functions
const prefix = configFile.prefix || envVars.QBPREFIX || "~";
const norm = text => text
    .trim()
    .toLowerCase()
    .replace(/\s+/, " "); //"normalize" text
const regex = Object.freeze({
    escape: str => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    url: /^(http|https):\/\/[^ "]+$/,
    camelToTitle: str => str.replace(/([A-Z])/g, " $1").charAt(0).toUpperCase() +
        str.replace(/([A-Z])/g, " $1").slice(1)
})
const icons = require("./db/icons.js");
const sp = "📕 Scarlet Pimpernel by Baroness Orczy";
const randQuoteQuery = "SELECT quote, source FROM Quotes WHERE id IN (SELECT id FROM Quotes ORDER BY RANDOM() LIMIT 1);";
const usedWeatherRecently = new Set(), usedStocksRecently = new Set(), usedLeagueRecently = new Set();
const asciiLogo = chalk`{blueBright
 ____            __       __        __ 
/ __ \\__ _____  / /____  / /  ___  / /_
/ /_/ / // / _ \\/ __/ _ \\/ _ \\/ _ \\/ __/
\\___\\_\\_,_/\\___/\\__/\\___/_.__/\\___/\\__/}` // Quotobot in ASCII art
const db = new sqlite3.cached.Database("./db/quotes.db", sqlite3.OPEN_READONLY);
db.each = promisify(db.each);
const embed = Object.freeze({
    "error": (description, code = "", title = "Error") => {
        if (!code) {
            code = "";
        } else {
            code = "`" + code + "`";
        }
        return new Discord.MessageEmbed()
            .setColor("ff0000")
            .setAuthor(title, icons.warn)
            .setDescription(`${description} ${code}`);
    },
    "simple": (text, attr, title = "Quote") =>
        new Discord.MessageEmbed()
            .setColor(6765239)
            .setAuthor("ㅤ", icons.quote)
            .setFooter(`—${attr}`, icons.empty)
            .setDescription(text)
            .setTitle(title),
    "stocks": ({ o: open, h: high, l: low, c: current, pc: prevClose, t: timestamp },
        symbol) => new Discord.MessageEmbed()
            .setTitle(`Current price for ${symbol.toUpperCase()} is \`${current.toFixed(2)}\``)
            .setURL("https://finance.yahoo.com/quote/" + symbol)
            .addField("High", "`" + high.toFixed(2) + "`", true)
            .addField("Low", "`" + low.toFixed(2) + "`", true)
            .addField("Open", "`" + open.toFixed(2) + "`", true)
            .addField("Previous Close", "`" + prevClose.toFixed(2) + "`", true)
            .setColor(current - prevClose >= 0 ? "4CAF50" : "F44336")
            .setFooter("Data from Finnhub")
            .setTimestamp(new Date(timestamp * 1000)),
    "currWeather": ( // formats the embed for the weather
        temp, maxTemp, minTemp,
        pressure, humidity, wind,
        cloudness, icon,
        author, profile,
        cityName, country, units) =>
        new Discord.MessageEmbed()
            .setColor("ff9800") // yellow
            .setAuthor(`Hello, ${author}`, profile)
            .setTitle(`It's ${temp}\u00B0 in ${cityName}, ${country}`)
            .addField(`🌡 Maximum Temperature:`, `${maxTemp}\u00B0`, true)
            .addField(`🌡 Minimum Temperature:`, `${minTemp}\u00B0`, true)
            .addField(`💧 Humidity:`, `${humidity}%`, true)
            .addField(`💨 Wind Speed:`, `${wind}`, true)
            .addField(`📊 Pressure:`, `${pressure} hpa`, true)
            .addField(`⛅️ Cloudiness:`, `${cloudness}`, true)
            .setFooter(`The above is in ${units} units — you can try \`${prefix}weather ${units == "metric" ? "imperial" : "metric"} ${cityName}\``, icons.info)
            .setThumbnail(`http://openweathermap.org/img/wn/${icon}@2x.png`)
})
bot.once("ready", () => {
    console.log("Ready!");
    console.log(asciiLogo);
    db.each(randQuoteQuery).then(
        ({ quote, source }) => console.log(chalk`{blueBright "${quote}" –${source}}`)
    )
    let invText;
    if (configFile.clientID) {
        invText = `https://discordapp.com/oauth2/authorize?client_id=${configFile.clientID}&scope=bot&permissions=${configFile.permissionValue.toString() || "280576"}`;
    } else {
        invText = "Available in the Discord developer portal";
    }
    console.table({
        "bot version": qbVersion,
        "prefix": prefix,
        "username": "@" + bot.user.username + "#" + bot.user.discriminator,
        "invite link": invText, "status": helpDomain,
        "server count": bot.guilds.cache.size,
        "weather key defined?": (configFile["weather-token"] || envVars.QBWEATHER ? "✅" : "🚫 weather will not work"),
        "help link": (configFile.helpURL || "default"),
        "author pictures available?": (picturesEnabled ? "✅" : "🚫 author pictures will not be embedded"),
        "stocks enabled?": (stocksEnabled ? "✅" : "🚫 stock commands will not work"),
        "league enabled?": (leagueEnabled ? "✅" : "🚫 League commands will not work")
    })
    if (helpDomain) {
        bot.user.setActivity(helpDomain, { type: "WATCHING" }); // Custom status "Watching example.qb"
    }
});
if (!token) {
    throw new Error("The token is falsy (usually undefined). Make sure you actually put a token in the config file or in the environment variable QBTOKEN.");
}
bot.login(token);
bot.on("warn", m => console.warn(chalk`{orange Warning: ${m}}`));
bot.on("error", m => console.error(chalk`{redBright Error: ${m}}`));
bot.on("message", message => {
    const prefixRegex = new RegExp(`^(<@!?${bot.user.id}>|${regex.escape(prefix)})\\s*`);
    if ((!prefixRegex.test(message.content)) || message.author.bot) return;
    const [matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const command = args.shift().trim().toLowerCase();
    console.count("Command");
    switch (command) {
        case "amiadmin":
            if (!message.member) return message.reply("Trick question.");
            if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("you're not admin!");
            else return message.reply("you are admin!");
        case "testdm":
            message.author.send("Looks like the DM worked! You can send commands in here.")
                .catch(error => {
                    if (error.message == "Cannot send messages to this user") {
                        message.reply("Oof, you seem to have DMs off.");
                    } else { console.error(error); }
                });
            break;
        case "help":
            message.channel.send(new Discord.MessageEmbed()
                .setTitle("⁉️ Click here for the commands.")
                .setColor("009688")
                .setURL(envVars.QBHELPURL || configFile.helpURL || "https://github.com/Team-Gigabyte/quotobot/wiki/Help")
                .setFooter(`v${qbVersion}~${bot.guilds.cache.size}`));
            break;
        case "ping":
            message.channel.send("Pong!");
            break;
        case "randomquote":
        case "randquote":
        case "rquote":
        case "quote":
            {
                (async () => {
                    try {
                        let { quote, source } = await db.each(randQuoteQuery);
                        let em = embed.simple(quote, source, "Random Quote");
                        if (authorPictures[source.trim()] && regex.url.test(authorPictures[source.trim()])) {
                            em.setThumbnail(authorPictures[source.trim()]);
                            em.setFooter(`—${source}`, authorPictures[source.trim()]);
                        }
                        message.channel.send(em);
                    } catch (err) {
                        message.reply(embed.error("There was an error on our end. Try again later.", "ERR_DATABASE"));
                        console.error(err.message);
                    }
                })();
                //  (I've given this quote ${randomQuote.usage} times before)
                /* db.run(`Update Quotes set usage = ? where id = ?`,
                    [randomQuote.usage + 1, randomQuote.id],
                    (error) => { if (error) { console.log(error.message); } }
                ); */
                break;
            }
        case "shortquote":
        case "shortquot":
        case "tweetquote":
            {
                (async () => {
                    try {
                        let { quote, source } = await db.each("SELECT quote, source FROM Quotes WHERE id IN (SELECT id FROM Quotes where length(quote) <= 140 ORDER BY RANDOM() LIMIT 1);");
                        let em = embed.simple(quote, source, "Random Quote");
                        if (authorPictures[source.trim()] && regex.url.test(authorPictures[source.trim()])) {
                            em.setThumbnail(authorPictures[source.trim()]);
                            em.setFooter(`—${source}`, authorPictures[source.trim()]);
                            em.setAuthor("Click here to tweet this quote!", icons.quote, `https://twitter.com/intent/tweet?text=${encodeURIComponent(`As ${source} once said, "${quote}" (from Quotobot <${envVars.QBSTATUS || configFile.helpDomain || "quotobot.js.org"}>)`)}`);
                        }
                        message.channel.send(em);
                    } catch (err) {
                        message.reply(embed.error("There was an error on our end. Try again later.", "ERR_DATABASE"));
                        console.error(err.message);
                    }
                })();
                break;
            }
        case "longquote":
        case "longquot":
            {
                (async () => {
                    try {
                        let { quote, source } = await db.each("SELECT quote, source FROM Quotes WHERE id IN (SELECT id FROM Quotes where length(quote) > 140 ORDER BY RANDOM() LIMIT 1);");
                        let em = embed.simple(quote, source, "Random Quote");
                        if (authorPictures[source.trim()] && regex.url.test(authorPictures[source.trim()])) {
                            em.setThumbnail(authorPictures[source.trim()]);
                            em.setFooter(`—${source}`, authorPictures[source.trim()]);
                        }
                        message.channel.send(em);
                    } catch (err) {
                        message.reply(embed.error("There was an error on our end. Try again later.", "ERR_DATABASE"));
                        console.error(err.message);
                    }
                })();
                break;
            }
        case "bibot":
            message.channel.send(embed.simple("Morbleu!", sp));
            break;
        case "intenselove":
            message.channel.send(embed.simple(
                "He seemed so devoted — a very slave — and there was a certain latent intensity in that love which had fascinated her.", sp));
            break;
        case "contempt":
            message.channel.send(embed.simple(
                "Thus human beings judge of one another, superficially, casually, throwing contempt on one another, with but little reason, and no charity.", sp));
            break;
        case "percysmart":
            message.channel.send(embed.simple(
                "He was calmly eating his soup, laughing with pleasant good-humour, as if he had come all the way to Calais for the express purpose of enjoying supper at this filthy inn, in the company of his arch-enemy.", sp));
            break;
        case "moneynomatter":
            message.channel.send(embed.simple(
                "Those friends who knew, laughed to scorn the idea that Marguerite St. Just had married a fool for the sake of the worldly advantages with which he might endow her. They knew, as a matter of fact, that Marguerite St. Just cared nothing about money, and still less about a title.", sp));
            break;
        case "brains":
            message.channel.send(embed.simple(
                '"Money and titles may be hereditary," she would say, "but brains are not."', sp));
            break;
        case "sppoem":
            message.channel.send(embed.simple(
                "We seek him here, we seek him there, those Frenchies seek him everywhere. Is he in heaven? — Is he in hell? That demmed, elusive Pimpernel?", sp));
            break;
        case "haters":
            message.channel.send(embed.simple(
                "How that stupid, dull Englishman ever came to be admitted within the intellectual circle which revolved round “the cleverest woman in Europe,” as her friends unanimously called her, no one ventured to guess—a golden key is said to open every door, asserted the more malignantly inclined.", sp));
            break;
        case "weathermetric":
        case "weather": {
            let timeout = configFile.weatherTimeout || envVars.QBWTIMEOUT || 15000
            if (usedWeatherRecently.has(message.author.id)) {
                message.reply(embed.error(`You need to wait ${timeout / 1000} seconds before asking for the weather again.`, "ERR_RATE_LIMIT", "Slow down!"));
            } else {
                (async () => {
                    if (!(configFile["weather-token"] || envVars.QBWEATHER)) {
                        message.reply(embed.error("Weather isn't currently working. Sorry about that.", "ERR_FALSY_WEATHER_KEY"));
                        console.error("Error: The weather key is falsy (usually undefined). Make sure you actually put a key in the config.json or in env.QBWEATHER.")
                        return;
                    }
                    if (!args[0]) {
                        message.reply(embed.error("You didn't include any arguments. Re-run the command with *metric* or *imperial* and the city name."));
                        return null;
                    }
                    let units = ["metric", "imperial"].includes(norm(args[0])) ? norm(args[0]) : "metric";
                    let city = !(["metric", "imperial"].includes(norm(args[0]))) ? args.slice(0).join(" ") : args.slice(1).join(" ");
                    if (!city) {
                        message.reply(embed.error("You didn't include a city name. Re-run the command with the city name.", `args: ${args.toString()}`));
                        return null;
                    }
                    let windUnits = units == "imperial" ? "mph" : "m/s";

                    try {
                        let apiData = await fetch(
                            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&APPID=${configFile["weather-token"] || envVars.QBWEATHER}`
                        );
                        let jd = await apiData.json();
                        if (!apiData.ok) {
                            message.reply(embed.error("There was an error getting the weather.", `${jd.cod || apiData.status}: ${jd.message || apiData.statusText}`));
                            return;
                        }
                        let { temp, temp_max, temp_min, humidity, pressure } = jd.main;
                        let currentTemp = Math.round(temp);
                        let maxTemp = Math.round(temp_max);
                        let minTemp = Math.round(temp_min);
                        let wind = jd.wind.speed + " " + windUnits;
                        let { username: author, displayAvatarURL: profile } = message.author;
                        let { icon, description: cloudness } = jd.weather[0];
                        let country = jd.sys.country;
                        country += cFlags.get(country).emoji ? " " + cFlags.get(country).emoji : "";
                        let displayCity = jd.name;
                        message.reply(embed.currWeather(currentTemp, maxTemp, minTemp, pressure, humidity, wind, cloudness, icon, author, profile, displayCity, country, units));
                        // Adds the user to the set so that they can't talk for some time
                        usedWeatherRecently.add(message.author.id);
                        setTimeout(() => {
                            // Removes the user from the set after timeout
                            usedWeatherRecently.delete(message.author.id);
                        }, timeout);
                    } catch (err) {
                        message.reply(embed.error("There was an error getting the weather.", `${err.toString().replaceAll(configFile["weather-token"] || envVars.QBWEATHER, "")}`));
                    }
                })();
            }
            break;
        }
        case "gotanygrapes":
            message.reply("https://www.youtube.com/watch?v=MtN1YnoL46Q"); // duck song
            break;
        case "stocks":
        case "stock": {
            const timeout = configFile.stockTimeout || envVars.QBSTIMEOUT || configFile.weatherTimeout || envVars.QBWTIMEOUT || 2000;
            if (usedStocksRecently.has(message.author.id)) {
                message.reply(embed.error(`You need to wait ${timeout / 1000} seconds before asking for stocks again.`, "ERR_RATE_LIMIT", "Slow down!"));
            } else {
                (async () => {
                    if (!stocksEnabled) {
                        message.reply(embed.error("Stock lookup isn't currently working. Sorry about that.", "ERR_NO_STOCK_KEY"));
                        return null;
                    }
                    if (!args[0]) {
                        message.reply(embed.error("You didn't include any arguments. Re-run the command with the stock name."));
                        return null;
                    }
                    try {
                        let gotData = await fetch(`https://finnhub.io/api/v1/quote?symbol=${args[0].toUpperCase()}&token=${configFile.stockToken || envVars.QBSTOCKS}`);
                        let stockData = await gotData.json();
                        if (!gotData.ok) {
                            message.reply(embed.error("There was an error getting stock info.", `${stockData.cod || gotData.status}: ${stockData.message || gotData.statusText}`));
                            return;
                        }
                        if (!stockData) {
                            message.reply(embed.error(`${args[0]} was not found.`, "ERR_EMPTY_RESPONSE"));
                            return null;
                        } else if (stockData.error ||
                            (Object.keys(stockData).length == 0 && stockData.constructor === Object) ||
                            Object.values(stockData).includes(undefined) ||
                            stockData.t === 0) {
                            message.reply(embed.error(`${args[0]} was not found.`, (stockData.error || "ERR_ALLSTOCK_ZERO")));
                            return null;
                        }
                        message.reply(embed.stocks(stockData, args[0]));
                    } catch (err) {
                        message.reply(embed.error("There was an error getting stock info.", (err.toString() || "ERR_FETCH").replace(configFile.stockToken || envVars.QBSTOCKS, "")))
                    }
                })();
                usedStocksRecently.add(message.author.id);
                setTimeout(() => {
                    // Removes the user from the set after timeout
                    usedStocksRecently.delete(message.author.id);
                }, timeout);
            }
            break;
        }
        case "league":
        case "lolstats":
        case "lol":
        case "leaguestats": {
            const timeout = configFile.leagueTimeout || envVars.QBLEAGUETIMEOUT || 5000;
            if (usedLeagueRecently.has(message.author.id)) {
                message.reply(embed.error(`You need to wait ${timeout / 1000} seconds before asking for League stats again.`, "ERR_RATE_LIMIT", "Slow down!"));
                return;
            }
            if (!leagueEnabled) {
                message.reply(embed.error("League stats lookup isn't currently working. Sorry about that.", "ERR_NO_LEAGUE_KEY"));
                return;
            }
            if (!args[0]) {
                message.reply(embed.error("You didn't include any arguments. Re-run the command with the summoner name."));
                return;
            }
            (async () => {
                let reg = "NA";

                if (args[1]) {
                    reg = args[1].toUpperCase();
                }
                try {
                    message.channel.startTyping();
                    if (reg != "NA") {
                        // eslint-disable-next-line no-undef
                        LeagueAPI.changeRegion(Region[reg]);
                    }
                    let acctObj = await LeagueAPI.getSummonerByName(args[0].replace(/\+/g, " "));
                    console.log(acctObj);
                    let addlData = await LeagueAPI.getLeagueRanking(acctObj);
                    message.channel.stopTyping(true);
                    let mbed = embed.simple(
                        "", "", `League Info for ${acctObj.name}`)
                        .setFooter("")
                        .addField("Summoner Level", acctObj.summonerLevel, false);
                    if (addlData !== undefined && addlData.length != 0) {
                        Object.keys(addlData[0]).forEach((key) => {
                            if (!key.endsWith("Id") && key != "summonerName") {
                                let val = addlData[0][key];
                                if (typeof val == "boolean") val = val ? "✅ Yes" : "🚫 No";
                                mbed.addField(regex.camelToTitle(key), String(val), true)
                            }
                        })
                    }
                    message.reply(mbed);
                    // eslint-disable-next-line no-undef
                    LeagueAPI.changeRegion(Region.NA);
                } catch (err) {
                    let errmessage = err?.status?.message || err?.message || err;
                    if (errmessage ==
                        "Error: getaddrinfo ENOTFOUND undefined.api.riotgames.com"
                    ) errmessage = "Invalid Region";
                    message.reply(embed.error("There was an error getting League stats.", errmessage));
                    message.channel.stopTyping(true);
                    message.channel.stopTyping();
                    // eslint-disable-next-line no-undef
                    LeagueAPI.changeRegion(Region.NA);
                    return null;
                }
            })();
            usedLeagueRecently.add(message.author.id);
            setTimeout(() => {
                // Removes the user from the set after timeout
                usedLeagueRecently.delete(message.author.id);
            }, timeout);
        }
            break;
        default:
            break;
    }
});
