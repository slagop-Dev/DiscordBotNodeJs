exports.execute = (client, message, args) => {
    // remove command word
    var text = message.content.substring(message.content.indexOf(" "));
    var guildName = "xxx";

    /* check if guildname contains -> "
    * have to parse the message in another way (gg)
    * ex: !message "guild name swag delta fox 2" general-channel hello
    */
    if(text.indexOf('"') > -1){
        // get guild name
        var end = text.substring(2).indexOf('"');
        guildName = text.substring(2, end+2);
        // get guild
        var guild = client.guilds.find("name", guildName);
        if(guild == null){
            message.channel.send("Invalid guild");
            return;
        }

        // insert words into array
        var rest = text.substring(end+2+2).split(" ");
        var msgToSend = "";
        for(var i = 1; i < rest.length; i++){
            msgToSend += rest[i] + " ";
        }

        // get channel
        var channel = guild.channels.find("name", rest[0]);
        if(channel == null){
            // try to get channel by id
            channel = guild.channels.get(rest[0]);
            if(channel == null){
                message.channel.send("Invalid channel");
                return;
            }
        }
        channel.send(msgToSend);
        return;
    }

    // try to get guild by name (one word name)
    var guild = client.guilds.find("name", args[1]);
    if(guild == null){
        // try to get guild by id
        guild = client.guilds.get(args[1]);
        if(guild == null){
            message.channel.send("Invalid guild");
            return;
        }
    }

    // try to get channel by name (channels cant have spaces)
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

    var msgToSend = "";
    for(var i = 3; i < args.length; i++){
        msgToSend += args[i] + " ";
    }

    channel.send(msgToSend)
        .catch(console.error);
};

exports.info = {
    name: "message",
    alias: ["sendMessage", "m"],
    permission: "default"
};
