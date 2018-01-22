const Discord = require('discord.js');
const YTDL = require('ytdl-core');
const YTF = require('youtube-finder');
const fs = require('fs');
const conf = require('./config.js');

///////////////////////////////////////////////////////////////////////////////

// bot client
const client = new Discord.Client();

// all servers with their play queues and audio providers
var guilds = {};

// get config values from a secret file
client.config = conf.config;

// youtube video searcher
const ytclient = YTF.createClient({key: client.config.YOUTUBE_APIKEY});

// add all commands
client.commands = [];
fs.readdir("./commands/", function(err, files){
    files.forEach(f => {
        const cmd = require(`./commands/${f}`);
        client.commands.push(cmd);
    });
});

///////////////////////////////////////////////////////////////////////////////

exports.playSong = (connection, guildId, searchString) => {
    // create guild object if it doesnt exist
    if(!guilds[guildId]) guilds[guildId] = {
        playQueue: []
    };

    var g = guilds[guildId];

    var params = {
        part: 'id',
        q: searchString,
        maxResults: 1,
        type: 'video'
    }
    ytclient.search(params, function(err, data) {
        //console.log("STRING:" + searchString + "\n---\n" + data);
        var vidId = data.items[0].id.videoId;
        g.dispatcher = connection.playStream(YTDL(vidId, {filter: "audioonly"}));

        g.dispatcher.on("end", end => {
            connection.disconnect();
        });
    });
};

exports.stopSong = (guildId) => {
    if(!guilds[guildId]) return;
    var g = guilds[guildId];
    if(g.dispatcher) g.dispatcher.end();
};

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
    if(client.config.ignore_channels.includes(msg.channel.id)) return;
    // avoid spam channels

    var u = msg.author.username;
    var c = msg.channel.name;
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
