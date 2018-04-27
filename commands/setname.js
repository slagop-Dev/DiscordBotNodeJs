exports.execute = (client, message, args) => {
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
    type: "admin",
    guildOnly: false,
	help: "Set bot name. ex: `.setname Botticus Newius namius`."
};
