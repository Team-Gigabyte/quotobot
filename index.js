const Discord = require('discord.js');
const client = new Discord.Client();
const configFile = require('./config.json');
const quoteFile = require('./quotes.json');
client.once('ready', () => {
    console.log('Ready!');
    if (configFile.clientID.toString) {
        console.log(`Invite me using https://discordapp.com/oauth2/authorize?client_id=${configFile.clientID}&scope=bot&permissions=${configFile.permissionValue.toString()}`);
    } else {
        console.log("Use the Discord developer portal to get your bot's invite link.")
    }
    console.log("The prefix is: " + configFile.prefix)
});
client.login(configFile.token);
client.on('message', message => {
    if (!message.content.startsWith(configFile.prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    switch (command) {
        case 'ping':
            message.channel.send('Pong!');
            break;
        case 'Bibot':
            message.channel.send('Morbleu!');
            break;
        case 'IntenseLove':
            message.channel.send('He seemed so devoted — a very slave—and there was a certain latent intensity in that love which had fascinated her.');
            break;
        case 'Contempt':
            message.channel.send('Thus human beings judge of one another, superficially, casually, throwing contempt on one another, with but little reason, and no charity.');
            break;
        case 'PercySmart':
            message.channel.send('He was calmly eating his soup, laughing with pleasant good-humour, as if he had come all the way to Calais for the express purpose of enjoying supper at this filthy inn, in the company of his arch-enemy.');
            break;
        case 'MoneyNoMatter':
            message.channel.send('Those friends who knew, laughed to scorn the idea that Marguerite St. Just had married a fool for the sake of the worldly advantages with which he might endow her. They knew, as a matter of fact, that Marguerite St. Just cared nothing about money, and still less about a title.');
            break;
        case 'Brains':
            message.channel.send('Money and titles may be hereditary,” she would say, “but brains are not.');
            break;
        case 'SPpoem':
            message.channel.send('We seek him here, we seek him there, Those Frenchies seek him everywhere. Is he in heaven?—Is he in hell? That demmed, elusive Pimpernel?');
            break;
        case 'Haters':
            message.channel.send('How that stupid, dull Englishman ever came to be admitted within the intellectual circle which revolved round “the cleverest woman in Europe,” as her friends unanimously called her, no one ventured to guess—a golden key is said to open every door, asserted the more malignantly inclined.');
            break;
        default:
            break;
    }
});
