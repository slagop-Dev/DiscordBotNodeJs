const YTDL = require('ytdl-core');
const YTF = require('youtube-finder');
const main = require('./bot.js');
const Discord = require('discord.js');

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

        // get info about video
        YTDL.getInfo(vidId, (err, info) => {
            var song = {
                id: vidId,
                title: vidId,
                length: info.length_seconds
            };
            if(!err) song.title = info.title;

            let ytVidUrl = "https://www.youtube.com/watch?v=" + song.id;
            let min = ~~(song.length / 60);
            let sec = ('0' + ~~(song.length % 60)).slice(0, 2);
            let qSong = "";
            let vidL = "`" + min + ":" + sec + "`";

            var embed = new Discord.RichEmbed()
                .setColor(9955331)
                .setDescription(`<:musical_note:408759580080865280> **Queued song:** [${song.title}](${ytVidUrl}) | ${vidL}`);

            message.channel.send(embed);

            g.playQueue.push(song);
            console.log("--> Queued song: " + song.title + " (" + vidId + ")");

            // join voice channel if not in one already
            if(!message.guild.voiceConnection){
                message.member.voiceChannel.join().then((connection) => {
                    playSong(connection, guildId);
                    console.log("--> Joined voice channel: "
                                + message.member.voiceChannel.name);
                });
            }
        });
    });
};

function playSong(connection, guildId){
    var g = guilds[guildId];
    g.dispatcher = connection.playStream(YTDL(g.playQueue[0].id, {filter: "audioonly"}));
    console.log("--> Started playing song: " + g.playQueue[0].title
                                        + " (" + g.playQueue[0].id + ")");
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
