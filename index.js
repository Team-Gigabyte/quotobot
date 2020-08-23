const Discord = require('discord.js');
const client = new Discord.Client();
const configFile = require('./config.json');
const token = configFile.token != "your-token-here-inside-these-quotes" ? configFile.token : process.env.QBTOKEN;
const quoteFile = require('./quotes.json');
// quote icon from: https://materialdesignicons.com/icon/comment-quote licensed under SIL OFL
const quoteIcon = "https://cdn.discordapp.com/attachments/449680513683292162/746829338816544889/unknown.png";
const emptyIcon = "https://cdn.discordapp.com/attachments/449680513683292162/746829996752109678/Untitled.png";
const sp = "📕 Scarlet Pimpernel by Baroness Orczy";
const serverDomain = "example.me";
const helpDomain = "quotobot.tk";
// start self-ping
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`https://${process.env.PROJECT_DOMAIN}.${serverDomain}/`);
}, 280000);
// end self-ping
const randKey = obj => {
    var keys = Object.keys(obj);
    return keys[keys.length * Math.random() << 0];
}; // gets random key from an object
const simpleEmbed = (text, attr) => {
    const toReturn = new Discord.MessageEmbed()
        .setColor(6765239)
        .setAuthor("Quote", quoteIcon)
        .setFooter(`––${attr}`, emptyIcon)
        .setDescription(`**${text}**`);
    return toReturn;
}
client.once('ready', () => {
    console.log('Ready!');
    if (configFile.clientID) {
        console.log(`Invite me using https://discordapp.com/oauth2/authorize?client_id=${configFile.clientID}&scope=bot&permissions=${configFile.permissionValue.toString()}`);
    } else {
        console.log("Use the Discord developer portal to get your bot's invite link.")
    }
    console.log("The prefix is: " + configFile.prefix);
    client.user.setActivity(helpDomain, { type: 'WATCHING' }); // Custom status "Watching quotobot.tk"
    /* quotes = [];
    for (var x of Object.values(quoteFile)) {
        quotes = quotes.concat(x);
    } */
});
client.login(token);
client.on('message', message => {
    if (!message.content.startsWith(configFile.prefix) || message.author.bot) return;
    //const args = message.content.slice(configFile.prefix.length).trim().split(/ +/);
    //const command = args.shift().toLowerCase();
    const command = message.content.slice(configFile.prefix.length).trim().toLowerCase();
    switch (command) {
        case 'ping':
            message.channel.send('Pong!');
            break;
        case 'randomquote':
        case 'randquote':
        case 'RandQuote':
        case 'RandomQuote':
            // This selects a random key in the quote file, gets a random quote, and sends an embed.
            const authorKey = randKey(quoteFile);
            const authorRand = quoteFile[authorKey];
            const randQuote = authorRand[Math.floor(Math.random() * authorRand.length)];
            const rqEmbed = new Discord.MessageEmbed()
                .setColor(6765239)
                .setAuthor("Random Quote", quoteIcon)
                .setFooter(`––${authorKey}`, "https://cdn.discordapp.com/attachments/449680513683292162/746829996752109678/Untitled.png")
                .setDescription(`**${randQuote}**`);
            message.channel.send(rqEmbed);
            break;
        case 'Bibot':
            message.channel.send(simpleEmbed('Morbleu!', sp));
            break;
        case 'IntenseLove':
            message.channel.send(simpleEmbed('He seemed so devoted — a very slave — and there was a certain latent intensity in that love which had fascinated her.', sp));
            break;
        case 'Contempt':
            message.channel.send(simpleEmbed('Thus human beings judge of one another, superficially, casually, throwing contempt on one another, with but little reason, and no charity.', sp));
            break;
        case 'PercySmart':
            message.channel.send(simpleEmbed('He was calmly eating his soup, laughing with pleasant good-humour, as if he had come all the way to Calais for the express purpose of enjoying supper at this filthy inn, in the company of his arch-enemy.', sp));
            break;
        case 'MoneyNoMatter':
            message.channel.send(simpleEmbed('Those friends who knew, laughed to scorn the idea that Marguerite St. Just had married a fool for the sake of the worldly advantages with which he might endow her. They knew, as a matter of fact, that Marguerite St. Just cared nothing about money, and still less about a title.', sp));
            break;
        case 'Brains':
            message.channel.send(simpleEmbed('"Money and titles may be hereditary,” she would say, “but brains are not."', sp));
            break;
        case 'SPpoem':
            message.channel.send(simpleEmbed('We seek him here, we seek him there, Those Frenchies seek him everywhere. Is he in heaven? — Is he in hell? That demmed, elusive Pimpernel?', sp));
            break;
        case 'Haters':
            message.channel.send(simpleEmbed('How that stupid, dull Englishman ever came to be admitted within the intellectual circle which revolved round “the cleverest woman in Europe,” as her friends unanimously called her, no one ventured to guess—a golden key is said to open every door, asserted the more malignantly inclined.', sp));
            break;
        default:
            break;
    }
});
