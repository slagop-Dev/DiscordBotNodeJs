exports.execute = (client, message, args) => {
    const emoji = client.emojis.find("name", "kappa");
    message.channel.send(`You have been helped ${emoji}`)
        .catch(console.error);
};

// TODO add some way of noticing the user of .commands
// TODO add .help cmd

exports.info = {
    name: "help",
    alias: [],
    permission: "default",
    type: "general"
};
