exports.execute = (client, message, args) => {
    const emoji = client.emojis.find("name", "kappa");
    var msg = `You have been helped ${emoji}`;
    message.channel.send(msg + "\n(check `.commands`)")
        .catch(console.error);
};

// TODO add some way of noticing the user of .commands
// TODO add .help cmd

exports.info = {
    name: "help",
    alias: [],
    permission: "default",
    type: "general",
    guildOnly: false,
	help: "Print help message"
};
