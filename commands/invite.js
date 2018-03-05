const Discord = require('discord.js');

exports.execute = (client, message, args) => {
    client.generateInvite().then(link => {
        var embed = new Discord.RichEmbed()
            .setColor(9955331)
            .addField("Invite link", "[link](" + link + ")", false);

        message.channel.send(embed);
    });
};

exports.info = {
    name: "invite",
    alias: ["inv"],
    permission: "default",
    type: "general"
};
