const Discord = require('discord.js');
const YTDL = require('ytdl-core');
const YTF = require('youtube-finder');
const fs = require('fs');
const confLoader = require('./util/configloader.js')

///////////////////////////////////////////////////////////////////////////////

// bot client
const client = new Discord.Client();

// all servers with their play queues and audio providers
var guilds = {};

// get config values.
// s = "heroku" => load from env variables
// s = "local" => load from config file
var s = "heroku";
client.config = confLoader.loadConf(s);

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

// TODO move all music things

exports.queueSong = (message, searchString) => {
    // get guild id
    var guildId = message.guild.id;

    // create guild object if it doesnt exist
    if(!guilds[guildId]) guilds[guildId] = {
        playQueue: []
    };

    // get guild object
    var g = guilds[guildId];

    // search for song on youtube and get video id
    var params = {
        part: 'id',
        q: searchString,
        maxResults: 1,
        type: 'video'
    }
    ytclient.search(params, function(err, data) {
        //console.log("STRING:" + searchString + "\n---\n" + data);
        if(data.items.length == 0){
            message.channel.send("<:warning:408740166715310100> No song found");
            return;
        }
        var vidId = data.items[0].id.videoId;
        g.playQueue.push(vidId);
        console.log("--> Queued song with id: " + vidId);

        if(!message.guild.voiceConnection){
            message.member.voiceChannel.join().then((connection) => {
                playSong(connection, guildId);
                console.log("--> Joined voice channel: "
                            + message.member.voiceChannel.name);
            });
        }
    });
};

function playSong(connection, guildId){
    var g = guilds[guildId];
    g.dispatcher = connection.playStream(YTDL(g.playQueue[0], {filter: "audioonly"}));
    console.log("--> Started playing song with id: " + g.playQueue[0]);
    g.playQueue.shift();

    // TODO: get song name. new ytdl filter?

    g.dispatcher.on("end", end => {
        console.log("--> Song ended");
        if(g.playQueue[0]){
            // play next song if there are more in the Q
            playSong(connection, guildId);
        }else{
            // leave voice channel if last song
            connection.disconnect();
            console.log("--> Leaving voice channel: " + connection.channel.name);
        }
    });
}

exports.pauseSong = (guildId) => {
    if(!guilds[guildId]) return;
    var g = guilds[guildId];
    if(g.dispatcher) g.dispatcher.pause();
    console.log("--> Paused song");
};

exports.resumeSong = (guildId) => {
    if(!guilds[guildId]) return;
    var g = guilds[guildId];
    if(g.dispatcher) g.dispatcher.resume();
    console.log("--> Resumed song");
};

exports.skipSong = (guildId) => {
    if(!guilds[guildId]) return;
    var g = guilds[guildId];
    if(g.dispatcher) g.dispatcher.end();
};

exports.stopSong = (guildId) => {
    if(!guilds[guildId]) return;
    var g = guilds[guildId];
    // remove rest of songs or dispatcher onEnd will keep looping
    g.playQueue = [];
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
