const Discord = require('discord.js');

exports.execute = (client, message, args) => {
    var generalCommands = "";
    var musicCommands = "";
    var funCommands = "";
    var adminCommands = "";

    client.commands.forEach(command => {
        switch(command.info.type){
            case "general":
                generalCommands += command.info.name + "\n";
                break;

            case "music":
                musicCommands += command.info.name + "\n";
                break;

            case "fun":
                funCommands += command.info.name + "\n";
                break;

            case "admin":
                adminCommands += command.info.name + "\n";
                break;

            // ignore hidden commands :^)
        }
    });

    var embed = new Discord.RichEmbed()
        .setColor(9955331)
        .addField("General Commands", generalCommands + "\n", true)
        .addField("Music Commands", musicCommands + "\n", true)
        .addField("Fun Commands", funCommands + "\n", true)
        .addField("Admin Commands", adminCommands + "\n", true)
        .setThumbnail("https://i.imgur.com/nOUmyDz.png");

    message.channel.send(embed);
};

exports.info = {
    name: "commands",
    alias: ["cmds", "cmd", "c"],
    permission: "default",
    type: "general"
};
