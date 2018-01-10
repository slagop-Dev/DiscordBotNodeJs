exports.execute = (client, message, args) => {
    if(message.author.id != client.config.OWNER_ID){
        message.channel.send("Only " + message.guild.members.get(client.config.OWNER_ID)
                                .toString() + " can use this command");
        return;
    }
    if(args.length < 2){
        message.channel.send("no new avatar url specified");
        return;
    }
    client.user.setAvatar(args[1])
        .then(user => console.log("New avatar: " + user.avatarURL))
        .catch(console.error);
};

exports.info = {
    name: "setavatar",
    alias: ["setbotavatar"],
    permission: "default"
};
