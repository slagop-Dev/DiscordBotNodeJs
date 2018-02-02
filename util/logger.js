exports.log(string) => {
    console.log(string);
};

exports.eventLog(string) => {
    console.log("--> " + string);
};

exports.messageLog(message) => {
    var s = `[${message.guild.name}][${message.channel.name}]`;
        s += `<${message.author.username}>: ${message.content}`;
    console.log(s);
};
