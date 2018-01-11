exports.execute = (client, message, args) => {
    var commands = "";
    client.commands.forEach(command => {
        commands += command.info.name + ", ";
    });
    message.channel.send(commands.slice(0, -2));
};

exports.info = {
    name: "commands",
    alias: [],
    permission: "default"
};
