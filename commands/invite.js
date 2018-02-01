exports.execute = (client, message, args) => {
    client.generateInvite().then(link => {
        message.channel.send("Invite me to your guild(server) with this link \n" + link);
    });
};

exports.info = {
    name: "invite",
    alias: ["inv"],
    permission: "default"
};
