require('dotenv').config()
const Discord = require('discord.js');
const fs = require('fs');
const cfg = require('./config.js');

///////////////////////////////////////////////////////////////////////////////

// bot client
const client = new Discord.Client();

// get config values.
client.config = {
    TOKEN: process.env.BOT_TOKEN,
    TRN_APIKEY: process.env.TRN_APIKEY,
    YOUTUBE_APIKEY: process.env.YOUTUBE_APIKEY,
    OWNER_ID: cfg.config.OWNER_ID,
    PREFIX: cfg.config.PREFIX,
    IGNORE_CHANNELS: cfg.config.IGNORE_CHANNELS
};
// let other files access config
exports.config = () => {
    return client.config;
}

// add all commands
client.commands = [];
fs.readdir("./commands/", function(err, files){
    files.forEach(f => {
        const cmd = require(`./commands/${f}`);
        client.commands.push(cmd);
    });
});

///////////////////////////////////////////////////////////////////////////////

client.on("ready", () => {
    console.log("+--------------+");
    console.log("|  BOT ONLINE  |");
    console.log("+--------------+");
    console.log(`| commands: ${client.commands.length} |`);
    console.log(`| guilds:   ${client.guilds.array().length}  |`);
    console.log(`| channels: ${client.channels.array().length} |`);
    console.log("+--------------+");
    client.user.setActivity(client.config.PREFIX + "help");
});

client.on("guildMemberAdd", member => {
    var guild = member.guild;
    var firstWritableChannel = guild.channels.filter(c => c.type === "text"
            && c.permissionsFor(guild.client.user).has("SEND_MESSAGES"))
                .sort((a, b) => a.position - b.position
            || Long.fromString(a.id).sub(Long.fromString(b.id)).toNumber())
                .first();
    const emoji = client.emojis.find("name", "feelsgoodman");
    firstWritableChannel.send(`Welcome ${member.displayName}! ${emoji}`);
});

client.on("guildMemberRemove", member => {
    var guild = member.guild;
    var firstWritableChannel = guild.channels.filter(c => c.type === "text"
            && c.permissionsFor(guild.client.user).has("SEND_MESSAGES"))
                .sort((a, b) => a.position - b.position
            || Long.fromString(a.id).sub(Long.fromString(b.id)).toNumber())
                .first();
    const emoji = client.emojis.find("name", "feelsbadman");
    firstWritableChannel.send(`${member.displayName} has left us ${emoji}`);
});

client.on("messageReactionAdd", (reaction, user) => {
    if(reaction.emoji.id == "403289960884600832"    // "no"-emoji
            && reaction.message.author == client.user   // only the bot's messages
            && !user.bot){                          // only let humans react-delete
        reaction.message.delete()
            .then(msg => console.log("Deleted message by request from: "
                                    + user.username))
            .catch(console.error);
    }
});

client.on("message", msg => {
    // avoid spam channels
    if(client.config.IGNORE_CHANNELS.includes(msg.channel.id)) return;

    // log all messages read (not saved)
    var u = msg.author.username;
    var c = msg.channel.name;
    if(c == undefined) c = "private";
    var m = msg.content;
    console.log("[" + c + "] " + u + ": " + m);

    if(!m.startsWith(client.config.PREFIX)) return;
    var args = m.substring(client.config.PREFIX.length).split(" ");
    var cmdName = args[0].toLowerCase();

    client.commands.forEach(command => {
        if(cmdName === command.info.name || command.info.alias.includes(cmdName)){
            command.execute(client, msg, args);
        }
    });
});

///////////////////////////////////////////////////////////////////////////////

client.login(client.config.TOKEN);
