var ap = require('./../audioprovider.js');

exports.execute = (client, message, args) => {
    ap.stopSong(message.guild.id);
};

exports.info = {
    name: "stop",
    alias: [],
    permission: "default",
    type: "music",
    guildOnly: true,
	help: "Stop playing music"
};
