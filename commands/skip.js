var ap = require('./../audioprovider.js');

exports.execute = (client, message, args) => {
    ap.skipSong(message.guild.id);
};

exports.info = {
    name: "skip",
    alias: [],
    permission: "default",
    type: "music",
    guildOnly: true,
	help: "Skip to the next song in the play queue"
};
