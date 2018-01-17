var main = require('./../bot.js');

exports.execute = (client, message, args) => {
    main.stopSong(message.guild.id);
};

exports.info = {
    name: "stop",
    alias: [],
    permission: "default"
};
