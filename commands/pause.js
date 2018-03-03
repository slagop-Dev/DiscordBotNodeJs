var ap = require('./../audioprovider.js');

exports.execute = (client, message, args) => {
    ap.pauseSong(message.guild.id);
};

exports.info = {
    name: "pause",
    alias: [],
    permission: "default",
    type: "music"
};
