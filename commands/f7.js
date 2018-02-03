const Discord = require('discord.js');
const fortnite = require('fortnitetracker-7days-stats');

exports.execute = (client, message, args) => {
    if(args.length < 2){
        message.channel.send("No player mentioned");
        return;
    }

    var name = args[1];
    var url = "https://fortnitetracker.com/profile/pc/" + name;
    message.channel.startTyping();

    fortnite.getStats(name, "pc", (result) => {
        if(result.status != "ok"){
            message.channel.send("Player not found");
            message.channel.stopTyping();
            return;
        }

        var msg = "";
        msg += "\nwins: " + result.wins;
        msg += "\ngames: " + result.matches;
        msg += "\nwinrate: " + ~~result.wr + "%";   // ~~ = absolute value
        msg += "\n\nkills: " + result.kills;
        msg += "\nkd: " + result.kd;
        msg += "\n\nplaytime: " + ~~(result.minutesPlayed / 60) + "h";

        var embed = new Discord.RichEmbed()
            .setAuthor("Stats from the last 7 days", "", url)
            .setDescription(msg)
            .setColor(9955331)
            .setURL(url)
            .setThumbnail("https://cdn2.unrealengine.com/Fortnite%2Fhome%2Ffn_battle_logo-1159x974-8edd8b02d505b78febe3baacec47a83c2d5215ce.png");

        message.channel.stopTyping();
        message.channel.send(embed);
    });
};

exports.info = {
    name: "f7",
    alias: ["fortnite7"],
    permission: "default"
};
