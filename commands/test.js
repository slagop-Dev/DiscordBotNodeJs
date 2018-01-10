/*
    First test command
*/

exports.execute = (client, message, args) => {
    message.channel.send("test complete");
};

exports.info = {
    name: "test",
    alias: ["test1", "test2", "test3"],
    permission: "default"
};
