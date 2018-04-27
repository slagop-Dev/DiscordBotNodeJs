exports.execute = (client, message, args) => {
    if(args.length < 2){
        message.channel.send("no game specified");
        return;
    }

    var gameName = "";
    for(var i = 1; i < args.length; i++){
        gameName += args[i] + " ";
    }
    client.user.setActivity(gameName)
        .then(user => console.log("--> Game set: " + gameName))
        .catch(console.error);
};

exports.info = {
    name: "setgame",
    alias: ["setbotgame", "setstatus"],
    permission: "admin",
    type: "admin",
	guildOnly: false,
	help: "set my game. ex: `.setgame Fortnite`"
};
