const main = require('./bot.js');

exports.execute = (client, message, args) => {
    if(args.length == 1){
        const emoji = client.emojis.find("name", "kappa");
        var msg = `You have been helped ${emoji}`;
        message.channel.send(msg + "\n(check `.commands`)")
            .catch(console.error);
    }else{
        var cmdName = args[1];
        main.commands().forEach(command => {
            if(cmdName === command.info.name || command.info.alias.includes(cmdName)){
                message.channel.send(`**$(command.info.name)** help: \n$(command.info.help)`);
                return;
            }
        }
    }
};

// TODO use embed for help message?
// TODO add .help cmd

exports.info = {
    name: "help",
    alias: [],
    permission: "default",
    type: "general",
    guildOnly: false,
    help: "Print help message"
};
