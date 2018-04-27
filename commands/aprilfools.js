/*
    April fools stuff xD
*/

exports.execute = (client, message, args) => {
    message.channel.send(":scream::scream::scream: NEW LEVEL SYSTEM ADDED TO BOT :scream::scream::scream: @here\n\nYou need to be level :two: to use this command :sparkles: :flushed: \n:clap: Donate :clap: :five::zero: dollars  :heavy_dollar_sign::heavy_dollar_sign::heavy_dollar_sign: :clap: to :clap: level :clap: up! :100: :100: :100: \n\n  ENJOY :joy::joy::joy:");
};

exports.info = {
    name: "aprilfool",
    alias: ["april", "fool", "aprilfools"],
    permission: "default",
    type: "hidden",
    guildOnly: false,
	help: "This was used as april fools 2018. Very funny haHAA."
};
