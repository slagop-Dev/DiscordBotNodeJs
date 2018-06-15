const Discord = require('discord.js');

exports.execute = (client, message, args) => {
    var msg = `commands: ${client.commands.length}`;
    msg += `\nguilds: ${client.guilds.array().length}`;
    msg += `\nchannels: ${client.channels.array().length}`;
    msg += `\nusers: ${client.users.array().length}`;
    msg += `\nemojis: ${client.emojis.array().length}`;
    msg += `\n\nping: ${client.ping.toFixed(0)}ms`;
    msg += `\nuptime: ${~~(client.uptime/1000)}s`;   // TODO fix format

    var msg2 = "[github](https://github.com/MonsterMannen/DiscordBotNodeJs)";

    var embed = new Discord.RichEmbed()
        .setColor(9955331)
        .addField("Bot Stats", msg, false)
        .addBlankField(false)
        .addField("Creator", "Monster#1337", false)
        .addField("Source", msg2, false);

    message.channel.send(embed);
};

exports.info = {
    name: "stats",
    alias: ["status", "info"],
    permission: "default",
    type: "general",
    guildOnly: false,
	help: "Print bot stats."
};
