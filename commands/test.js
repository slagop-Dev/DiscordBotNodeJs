/*
    First test command
*/

exports.execute = (client, message, args) => {
    message.channel.send("test complete")
        .then(msg => {
            msg.react(client.emojis.find("name", "no").id);
        })
        .catch(console.error);
};

exports.info = {
    name: "test",
    alias: ["test1", "test2", "test3"],
    permission: "default"
};
