const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const { env } = require('process')

const client = new CommandoClient({
    commandPrefix: '~',
    owner: '1234'
    //invite: 'https://discord.gg/abc',
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['first', 'Your First Command Group'],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
    client.user.setActivity('with Commando');
});

client.on('error', console.error);

client.login(env.QBTOKEN);