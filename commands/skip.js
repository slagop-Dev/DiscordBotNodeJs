var main = require('./../bot.js');

exports.execute = (client, message, args) => {
    main.skipSong(message.guild.id);
};

exports.info = {
    name: "skip",
    alias: [],
    permission: "default"
};
