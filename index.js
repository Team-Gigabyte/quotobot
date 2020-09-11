#!/usr/bin/env node
"use strict";
// NPM modules {
const Discord = require('discord.js');
const { env: envVars } = require('process');
const axios = require("axios").default;
const cFlags = require("country-flag-emoji");
const sqlite3 = require("sqlite3");
const { promisify } = require('util');
// } 
// config stuff {
const { version: qbVersion } = require('./package.json');
const bot = new Discord.Client();
let configFile;
try {
    configFile = require("./config.json");
} catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') {
        throw e;
    }
    configFile = { "help-domain": "quotobot.tk" };
}
const prefix = configFile.prefix || envVars.QBPREFIX || "~";
let token = undefined;
if (configFile.token == "your-token-here-inside-these-quotes") {
    token = envVars.QBTOKEN;
} else if (!configFile.token) { token = envVars.QBTOKEN; }
else { token = configFile.token; }
const helpDomain = configFile['help-domain'] || envVars.QBSTATUS || undefined;
// } 
// functions and icons {
const norm = text => { // "normalize" text
    return text
        .trim()
        .toLowerCase()
        .replace(/\s+/, " ");
}
const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const icons = {
    quote: "https://cdn.discordapp.com/attachments/449680513683292162/746829338816544889/unknown.png",// from https://materialdesignicons.com/icon/comment-quote licensed under SIL OFL
    empty: "https://cdn.discordapp.com/attachments/449680513683292162/746829996752109678/Untitled.png",
    info: "https://cdn.discordapp.com/attachments/449680513683292162/748682998022537287/information_2139.png", // this and below from Twemoji license under CC-BY 4.0
    warn: "https://cdn.discordapp.com/attachments/449680513683292162/751892501375221862/warning_26a0.png"
}
const errorEmbed = (description, code = "", title = "Error") => {
    if (!code) {
        code = '';
    } else {
        code = "`" + code + "`";
    }
    return new Discord.MessageEmbed()
        .setColor("ff0000")
        .setAuthor(title, icons.warn)
        .setDescription(`${description} ${code}`);
}
const weatherEmbed = ( // formats the embed for the weather
    temp, maxTemp, minTemp,
    pressure, humidity, wind,
    cloudness, icon,
    author, profile,
    cityName, country, units) => {
    return new Discord.MessageEmbed()
        .setColor("ff9800") // yellow
        .setAuthor(`Hello, ${author}`, profile)
        .setTitle(`It's ${temp}\u00B0 in ${cityName}, ${country}`)
        .addField(`🌡 Maximum Temperature:`, `${maxTemp}\u00B0`, true)
        .addField(`🌡 Minimum Temperature:`, `${minTemp}\u00B0`, true)
        .addField(`💧 Humidity:`, `${humidity}%`, true)
        .addField(`💨 Wind Speed:`, `${wind}`, true)
        .addField(`📊 Pressure:`, `${pressure} hpa`, true)
        .addField(`⛅️ Cloudiness:`, `${cloudness}`, true)
        .setFooter(`The above is in ${units} units — you can try \`${prefix}weather ${units == "metric" ? "imperial" : "metric"} City\``, icons.info)
        .setThumbnail(`http://openweathermap.org/img/wn/${icon}@2x.png`);
}
const simpleEmbed = (text, attr, title = "Quote") => {
    return new Discord.MessageEmbed()
        .setColor(6765239)
        .setAuthor(title, icons.quote)
        .setFooter(`—${attr}`, icons.empty)
        .setDescription(`**${text}**`);
}
const sp = "📕 Scarlet Pimpernel by Baroness Orczy";
// } 
// database {
const db = new sqlite3.Database('./db/quotes.db');
db.each = promisify(db.each);
// }
bot.once('ready', () => {
    console.info("Ready!");
    let invText;
    if (configFile.clientID) {
        invText = `https://discordapp.com/oauth2/authorize?client_id=${configFile.clientID}&scope=bot&permissions=${configFile.permissionValue.toString() || "280576"}`;
    } else {
        invText = 'Available in the Discord developer portal';
    }
    console.table({
        "bot version": qbVersion,
        "prefix": prefix,
        "username": "@" + bot.user.username + "#" + bot.user.discriminator,
        "invite link": invText, "status": helpDomain,
        "server count": bot.guilds.cache.size,
        "weather key defined?": (configFile["weather-token"] || envVars.QBWEATHER ? "✅" : "🚫"),
        "help link": (configFile.helpURL || "default"),
    })
    if (helpDomain) {
        bot.user.setActivity(helpDomain, { type: 'WATCHING' }); // Custom status "Watching example.qb"
    }
});
if (!token) {
    throw new Error("The token is falsy (usually undefined). Make sure you actually put a token in the config file or in the environment variable QBTOKEN.");
}
bot.login(token);
bot.on('debug', m => console.debug('debug', m));
bot.on('warn', m => console.warn('warn', m));
bot.on('error', err => console.error(err));
bot.on('message', message => {
    const prefixRegex = new RegExp(`^(<@!?${bot.user.id}>|${escapeRegex(prefix)})\\s*`);
    if ((!prefixRegex.test(message.content)) || message.author.bot) return;
    const [matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const command = args.shift().trim().toLowerCase();
    switch (command) {
        case 'testdm':
            message.author.send("Looks like the DM worked! You can send commands in here.")
                .catch(error => {
                    if (error.message == "Cannot send messages to this user") {
                        message.reply("you seem to have DMs off.");
                    } else { console.error(error); }
                });
            break;
        case 'help':
            message.channel.send(new Discord.MessageEmbed()
                .setTitle("Click here for the commands.")
                .setColor("009688")
                .setURL(configFile.helpURL || "https://github.com/ssharker21/quotobot/wiki"));
            break;
        case 'ping':
            message.channel.send("Pong!");
            break;
        case 'randomquote':
        case 'randquote':
        case 'quote':
            {
                (async () => {
                    try {
                        let { quote, source } = await db.each("SELECT * FROM Quotes WHERE id IN (SELECT id FROM Quotes ORDER BY RANDOM() LIMIT 1);");
                        message.channel.send(simpleEmbed(quote, source, "Random Quote"));
                    } catch (err) {
                        message.reply(errorEmbed("There was an error on our end. Try again later.", "ERR_DATABASE"));
                        console.error(err.message);
                    }
                })();
                //  (I've given this quote ${randomQuote.usage} times before)
                /* db.run(`Update Quotes set usage = ? where id = ${randomQuote.id}`,
                    [randomQuote.usage + 1],
                    (error) => { if (error) { console.log(error.message); } }
                ); */
                break;
            }
        case 'Bibot':
            message.channel.send(simpleEmbed('Morbleu!', sp));
            break;
        case 'IntenseLove':
            message.channel.send(simpleEmbed(
                'He seemed so devoted — a very slave — and there was a certain latent intensity in that love which had fascinated her.', sp));
            break;
        case 'Contempt':
            message.channel.send(simpleEmbed(
                'Thus human beings judge of one another, superficially, casually, throwing contempt on one another, with but little reason, and no charity.', sp));
            break;
        case 'PercySmart':
            message.channel.send(simpleEmbed(
                'He was calmly eating his soup, laughing with pleasant good-humour, as if he had come all the way to Calais for the express purpose of enjoying supper at this filthy inn, in the company of his arch-enemy.', sp));
            break;
        case 'MoneyNoMatter':
            message.channel.send(simpleEmbed(
                'Those friends who knew, laughed to scorn the idea that Marguerite St. Just had married a fool for the sake of the worldly advantages with which he might endow her. They knew, as a matter of fact, that Marguerite St. Just cared nothing about money, and still less about a title.', sp));
            break;
        case 'Brains':
            message.channel.send(simpleEmbed(
                '"Money and titles may be hereditary,” she would say, “but brains are not."', sp));
            break;
        case 'SPpoem':
            message.channel.send(simpleEmbed(
                'We seek him here, we seek him there, those Frenchies seek him everywhere. Is he in heaven? — Is he in hell? That demmed, elusive Pimpernel?', sp));
            break;
        case 'Haters':
            message.channel.send(simpleEmbed(
                'How that stupid, dull Englishman ever came to be admitted within the intellectual circle which revolved round “the cleverest woman in Europe,” as her friends unanimously called her, no one ventured to guess—a golden key is said to open every door, asserted the more malignantly inclined.', sp));
            break;
        case 'weathermetric':
        case 'weather': (async function () {
            if (!(configFile["weather-token"] || envVars.QBWEATHER)) {
                message.reply(errorEmbed("Weather isn't currently working. Sorry about that.", "ERR_FALSY_WEATHER_KEY"));
                console.error("The weather key is falsy (usually undefined). Make sure you actually put a key in the config.json or in env.QBWEATHER.")
                return;
            }
            if (!args[0]) {
                message.reply(errorEmbed("You didn't include any arguments. Re-run the command with *metric* or *imperial* and the city name."));
                return null;
            }
            let units = ['metric', 'imperial'].includes(norm(args[0])) ? norm(args[0]) : "metric";
            let city = !(['metric', 'imperial'].includes(norm(args[0]))) ? args.slice(0).join(" ") : args.slice(1).join(" ");
            if (!city) {
                message.reply(errorEmbed("You didn't include a city name. Re-run the command with the city name.", `args: ${args.toString()}`));
                return null;
            }
            let windUnits = units == "imperial" ? "mph" : "m/s";

            try {
                let apiData = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&APPID=${configFile["weather-token"] || envVars.QBWEATHER}`
                );
                let { temp, temp_max, temp_min } = apiData.data.main;
                let currentTemp = Math.round(temp);
                let maxTemp = Math.round(temp_max);
                let minTemp = Math.round(temp_min);
                let { humidity, pressure } = apiData.data.main;
                let wind = apiData.data.wind.speed + " " + windUnits;
                let { username: author, displayAvatarURL: profile } = message.author;
                let { icon, description: cloudness } = apiData.data.weather[0];
                let country = apiData.data.sys.country;
                country += cFlags.get(country).emoji ? " " + cFlags.get(country).emoji : "";
                let displayCity = apiData.data.name;
                message.reply(weatherEmbed(currentTemp, maxTemp, minTemp, pressure, humidity, wind, cloudness, icon, author, profile, displayCity, country, units));
            } catch (err) {
                message.reply(errorEmbed("There was an error getting the weather.", `${err.response.data.cod}: ${err.response.data.message}`))
            }

        })();
            break;
        default:
            break;
    }
});