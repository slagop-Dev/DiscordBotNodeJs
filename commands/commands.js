const Discord = require('discord.js');

exports.execute = (client, message, args) => {
    var commands = "";
    client.commands.forEach(command => {
        commands += command.info.name + "\n";
    });

    var embed = new Discord.RichEmbed()
        .setDescription(commands)
        .setColor(9955331);

    message.channel.send(embed);
};

exports.info = {
    name: "commands",
    alias: [],
    permission: "default",
    type: "general"
};
