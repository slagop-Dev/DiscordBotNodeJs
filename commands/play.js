exports.execute = (client, message, args) => {
    var voiceChannel = message.member.voiceChannel;

    if(voiceChannel == null){
        message.channel.send("You are not in a voice channel :(");
        return;
    }if(!voiceChannel.joinable){
        message.channel.send("Not allowed to join :(");
        return;
    }

    // add guild object if it doesnt exist
    /*
    if(!guilds[message.guild.id]) guilds[message.guild.id] = {
        playQueue: []
    };
    */

    voiceChannel.join()
        .then(connection => {
            console.log("Joined voice channel: " + voiceChannel.name);

            //var guild = guilds[message.guild.id];

            // music player
            // test song
            //guild.dispatcher = connection.playFile('./audio/M.O.P_-_Ante_Up.mp3');
            const dispatcher = connection.playFile('./audio/M.O.P_-_Ante_Up.mp3');

            dispatcher.on("end", end => {
                connection.disconnect();
            });
        })
        .catch(console.error);

};

exports.info = {
    name: "play",
    alias: [],
    permission: "default"
};
