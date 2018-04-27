exports.execute = (client, message, args) => {
    message.channel.send("TRASH TRASH TRASH")
        .catch(console.error);
};

exports.info = {
    name: "pubg",
    alias: [],
    permission: "default",
    type: "fun",
    guildOnly: false,
    help: "Just a command to trash-talk pubg xD"
};
