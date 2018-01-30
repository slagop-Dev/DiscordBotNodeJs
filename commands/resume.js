var main = require('./../bot.js');

exports.execute = (client, message, args) => {
    main.resumeSong(message.guild.id);
};

exports.info = {
    name: "resume",
    alias: [],
    permission: "default"
};
