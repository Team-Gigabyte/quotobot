const Discord = require('discord.js');
const client = new Discord.Client();
const configFile = require('./config.json');
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
    switch (message.content) {
        case `${configFile.prefix}ping`:
            message.channel.send('Pong!');
            break;
        default:
            break;
    }
});