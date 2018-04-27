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
        .addField("General Commands", generalCommands + "\n", false)
        .addField("Music Commands", musicCommands + "\n", false)
        .addField("Fun Commands", funCommands + "\n", false)
        .addField("Admin Commands", adminCommands + "\n", false);

    message.channel.send(embed);
};

exports.info = {
    name: "commands",
    alias: ["cmds", "cmd", "c"],
    permission: "default",
    type: "general",
    guildOnly: false,
	help: "Print all commands"
};
