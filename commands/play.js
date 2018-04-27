var ap = require('./../audioprovider.js');

exports.execute = (client, message, args) => {
    if(args.length < 2){
        message.channel.send("<:warning:408740166715310100> No song specified");
        return;
    }

    if(!message.member.voiceChannel){
        message.channel.send("<:warning:408740166715310100> You are not in a voice channel");
        return;
    }

    // only check for joinable if not already in voiceChannel
    var botUserId = client.user.id;
    if(!message.member.voiceChannel.members.get(botUserId)
                && !message.member.voiceChannel.joinable){
        message.channel.send("<:warning:408740166715310100> Not allowed to join. Maybe full channel");
        return;
    }

    // search string
    args.shift();
    var searchString = args.join(" ");

    ap.queueSong(message, searchString);
};

exports.info = {
    name: "play",
    alias: [],
    permission: "default",
    type: "music",
    guildOnly: true,
    help: "Play a song from youtube. Use either the song name, a youtube URL or a video ID."
    + "\n\nex: `.play Eminem Monster` or `.play https://youtu.be/EHkozMIXZ8w` or `.play EHkozMIXZ8w`." 
    + "\n\nUsing this command while a song is already playing will put the next song in the play queue."
};
