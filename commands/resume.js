var ap = require('./../audioprovider.js');

exports.execute = (client, message, args) => {
    ap.resumeSong(message.guild.id);
};

exports.info = {
    name: "resume",
    alias: [],
    permission: "default",
    type: "music",
    guildOnly: true,
	help: "Resume playing a paused song"
};
