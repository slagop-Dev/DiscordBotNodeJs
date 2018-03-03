exports.execute = (client, message, args) => {
    var msg = "**" + client.user.username + "**";
    msg += `\n commands: ${client.commands.length}`;
    msg += `\n guilds: ${client.guilds.array().length}`;
    msg += `\n channels: ${client.channels.array().length}`;
    msg += `\n emojis: ${client.emojis.array().length}`;
    msg += `\n ping: ${client.ping}ms`;
    msg += `\n uptime: ${~~(client.uptime/1000)}s`;   // TODO fix format
    message.channel.send(msg);

    // TODO: add embed
};

exports.info = {
    name: "stats",
    alias: ["status", "info"],
    permission: "default",
    type: "general"
};
