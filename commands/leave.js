exports.execute = (client, message, args) => {
    if(message.member.voiceChannel == null) return;

    message.member.voiceChannel.leave();
    console.log("Left voice channel: " + message.member.voiceChannel.name);
};

exports.info = {
    name: "leave",
    alias: [],
    permission: "default"
};
