var ap = require('./../audioprovider.js');

exports.execute = (client, message, args) => {
    ap.playQueue(message.guild.id, message.channel);
};

// TODO fix this command

exports.info = {
    name: "queue",
    alias: ["playqueue", "q"],
    permission: "default",
    type: "music"
};
