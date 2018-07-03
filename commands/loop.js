var ap = require('./../audioprovider.js');

exports.execute = (client, message, args) => {
    ap.toggleLoop(message.guild.id, message.channel);
};

exports.info = {
    name: "loop",
    alias: ["repeat"],
    permission: "default",
    type: "music",
    guildOnly: true,
	help: "Toogle loop of current playlist."
};
