var main = require('./../bot.js');

exports.execute = (client, message, args) => {
    if(args.length < 2){
        message.channel.send("<:warning:408740166715310100> No song specified");
        return;
    }

    if(!message.member.voiceChannel){
        message.channel.send("<:warning:408740166715310100> You are not in a voice channel");
        return;
    }

    if(!message.member.voiceChannel.joinable){
        message.channel.send("<:warning:408740166715310100> Not allowed to join. Maybe full channel");
        return;
    }

    // search string
    var searchString = "";
    for(var i = 1; i < args.length; i++){
        searchString += args[i] + " ";
    }

    main.queueSong(message, searchString);
};

exports.info = {
    name: "play",
    alias: [],
    permission: "default"
};
