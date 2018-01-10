exports.execute = (client, message, args) => {
    var msgToSend = "";
    for(var i = 3; i < args.length; i++){
        msgToSend += args[i] + " ";
    }
    var guildId = args[1];
    var channelId = args[2];
    client.guilds.get(guildId).channels.get(channelId).send(msgToSend)
        .catch(console.error);

    // TODO check write permission
};

exports.info = {
    name: "message",
    alias: ["sendMessage"],
    permission: "default"
};
