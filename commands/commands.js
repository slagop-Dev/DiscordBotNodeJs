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
        .addField("General Commands", generalCommands, true)
        .addField("Music Commands", musicCommands, true)
        .addField("Fun Commands", funCommands, true)
        .addField("Admin Commands", adminCommands, true);

    message.channel.send(embed);
};

exports.info = {
    name: "commands",
    alias: [],
    permission: "default",
    type: "general"
};
