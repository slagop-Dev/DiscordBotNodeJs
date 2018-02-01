const YTDL = require('ytdl-core');
const YTF = require('youtube-finder');
const main = require('./bot.js');

// all servers with their play queues and audio providers
var guilds = {};

// youtube video searcher
const ytclient = YTF.createClient({key: main.config().YOUTUBE_APIKEY});

// methods //
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
                playSong(connection, message);
                console.log("--> Joined voice channel: "
                            + message.member.voiceChannel.name);
            });
        }
    });
};

function playSong(connection, message){
    var guildId = message.guild.id;
    var g = guilds[guildId];
    g.dispatcher = connection.playStream(YTDL(g.playQueue[0], {filter: "audioonly"}));

    // get info about video
    YTDL.getInfo(g.playQueue[0], (err, info) => {
        console.log("--> Started playing song: " + info.title + " (" + g.playQueue[0] + ")");
        message.channel.send("<:musical_note:408759580080865280> Queued song: **" + info.title + "**");
    });

    g.playQueue.shift();


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
