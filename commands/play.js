var main = require('./../bot.js');

exports.execute = (client, message, args) => {
    if(args.length < 2){
        message.channel.send("Specify a song to play :(");
        return;
    }

    if(!message.member.voiceChannel){
        message.channel.send("You are not in a voice channel :(");
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
