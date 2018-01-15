exports.execute = (client, message, args) => {
    if(message.member.voiceChannel == null){
        message.channel.send("You are not in a voice channel :(");
        return;
    }else if(!message.member.voiceChannel.joinable){
        message.channel.send("Not allowed to join :(");
        return;
    }else{
        message.member.voiceChannel.join()
            .then(connection => {
                console.log("Joined voice channel: "
                            + message.member.voiceChannel.name)
            });
    }
};

exports.info = {
    name: "join",
    alias: [],
    permission: "default"
};
