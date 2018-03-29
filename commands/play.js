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
    type: "music"
};
