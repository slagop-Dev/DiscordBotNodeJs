var ap = require('./../audioprovider.js');

exports.execute = (client, message, args) => {
    ap.skipSong(message.guild.id);
};

exports.info = {
    name: "skip",
    alias: [],
    permission: "default"
};
