var ap = require('./../audioprovider.js');

exports.execute = (client, message, args) => {
    ap.playQueue(message.guild.id, message.channel);
};

exports.info = {
    name: "queue",
    alias: ["playqueue", "q"],
    permission: "default",
    type: "music",
	guildOnly: true,
	help: "Display current Play Queue"
};
