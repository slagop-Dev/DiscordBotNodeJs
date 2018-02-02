exports.send = (message, string) => {
    if(string.length > 2000){
        string = string.substring(0, 1980);
        string += " [MESSAGE TOO LONG]";
    }
    message.channel.send(string);
};

exports.sendErrorMessage(message, string) => {
    message.channel.send("<:warning:408740166715310100> " + string);
};
