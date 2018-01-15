exports.execute = (client, message, args) => {
    message.channel.send("`CRASHED`\n\ndumping password: **hunter2**");
};

exports.info = {
    name: "play",
    alias: [],
    permission: "default"
};
