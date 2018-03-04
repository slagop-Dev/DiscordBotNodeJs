const Discord = require('discord.js');

exports.execute = (client, message, args) => {
    var msg = `commands: ${client.commands.length}`;
    msg += `\nguilds: ${client.guilds.array().length}`;
    msg += `\nchannels: ${client.channels.array().length}`;
    msg += `\nemojis: ${client.emojis.array().length}`;
    msg += `\nping: ${client.ping.toFixed(0)}ms`;
    msg += `\nuptime: ${~~(client.uptime/1000)}s`;   // TODO fix format

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
