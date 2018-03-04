const Discord = require('discord.js');

exports.execute = (client, message, args) => {
    var msg = ` commands: ${client.commands.length}`;
    msg += `\n guilds: ${client.guilds.array().length}`;
    msg += `\n channels: ${client.channels.array().length}`;
    msg += `\n emojis: ${client.emojis.array().length}`;
    msg += `\n ping: ${client.ping}ms`;
    msg += `\n uptime: ${~~(client.uptime/1000)}s`;   // TODO fix format

    var embed = new Discord.RichEmbed()
        .setColor(9955331)
        .addField("Stats", msg, false);

    message.channel.send(embed);
};

exports.info = {
    name: "stats",
    alias: ["status", "info"],
    permission: "default",
    type: "general"
};
