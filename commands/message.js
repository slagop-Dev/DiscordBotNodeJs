exports.execute = (client, message, args) => {
    if(args.length < 4){
        message.channel.send("Too few args. `.m <guild> <channel> <message>`");
        return;
    }

    let quote = '"';

    // remove command word
    var text = message.content.substring(message.content.indexOf(" "));

    // change args parse if server name contains spaces
    if(text.indexOf(quote) > -1){
        args = [];
        var end = text.substring(2).indexOf(quote);
        args[0] = "";
        args[1] = text.substring(2, end+2); // guildname

        var rest = text.substring(end+2+2).split(" ");
        args[2] = rest[0];

        for(var i = 1; i < rest.length; i++){
            args[2+i] = rest[i];
        }
    }

    // args[1] = guild name
    // args[2] = channel name
    // args[3+] = message

    // try to get guild by name
    var guild = client.guilds.find("name", args[1]);
    if(guild == null){
        // try to get guild by id
        guild = client.guilds.get(args[1]);
        if(guild == null){
            message.channel.send("Invalid guild");
            return;
        }
    }

    // try to get channel by name
    var channel = guild.channels.find("name", args[2]);
    if(channel == null){
        // try to get channel by id
        channel = guild.channels.get(args[2]);
        if(channel == null){
            message.channel.send("Invalid channel");
            return;
        }
    }

    // check channel permission
    if(!channel.permissionsFor(guild.client.user).has("SEND_MESSAGES")){
        message.channel.send("Not allowed to send messages in that channel");
        return;
    }

    // put together message from args
    var msgToSend = "";
    for(var i = 3; i < args.length; i++){
        msgToSend += args[i] + " ";
    }

    // send it
    channel.send(msgToSend)
        .catch(console.error);
};

exports.info = {
    name: "message",
    alias: ["sendMessage", "msg", "m"],
    permission: "admin",
    type: "hidden",
	guildOnly: false,
	help: "send a message. ex: `.msg guildName channelName messageHere`"
};
