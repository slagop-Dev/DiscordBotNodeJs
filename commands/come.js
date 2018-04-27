exports.execute = (client, message, args) => {
    if(!message.member.voiceChannel){
        message.channel.send("<:warning:408740166715310100> You are not in a voice channel");
        return;
    }

    var botUserId = client.user.id;
    if(message.member.voiceChannel.members.get(botUserId)){
        message.channel.send("<:warning:408740166715310100> Already in your voice channel");
        return;
    }

    // check all voice channels
    if(!message.member.guild.voiceConnection){
        message.channel.send("I can only come to your channel when I'm playing music. use `.play songname` first :)");
        return;
    }

    // only check for joinable if not already in voiceChannel
    if(!message.member.voiceChannel.members.get(botUserId)
                && !message.member.voiceChannel.joinable){
        message.channel.send("<:warning:408740166715310100> Not allowed to join. Maybe full channel.");
        return;
    }

    message.member.voiceChannel.join().then( () => {
        console.log("--> Joined voice channel: "
                    + message.member.voiceChannel.name);
    });
};

exports.info = {
    name: "come",
    alias: ["join", "summon"],
    permission: "default",
    type: "music",
    guildOnly: true,
	help: "Make me join your voice channel"
};
