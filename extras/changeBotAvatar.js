const Discord = require("discord.js")
const bot = new Discord.Client();
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
readline.question("What's the bot token? ", ans => {
    bot.login(ans)
    readline.question("What's the URL/path of the avatar? ", url => {
        bot.user.setAvatar(url).then(() => {
            console.log("All done!")
            process.exit(0)
        }).catch(e => { throw e })

    })
})