exports.execute = (client, message, args) => {
    if(message.author.id != client.config.OWNER_ID){
        message.channel.send("Only " + message.guild.members
            .get(client.config.OWNER_ID).toString() + " can use this command");
        return;
    }
    if(args.length < 2){
        message.channel.send("no new name specified");
        return;
    }

    var username = "";
    for(var i = 1; i < args.length; i++){
        username += args[i] + " ";
    }
    client.user.setUsername(username)
        .then(user => console.log("--> New username set: " + user.username));
};

exports.info = {
    name: "setname",
    alias: ["setusername", "setbotusername", "setbotname"],
    permission: "admin",
    type: "admin"
};
