// Load API keys from a local config file or from environment variables

exports.loadConf = (s) => {
    if(s == "heroku"){
        var config = {
            TOKEN: process.env.BOT_TOKEN,
            TRN_APIKEY: process.env.TRN_APIKEY,
            YOUTUBE_APIKEY: process.env.YOUTUBE_APIKEY,
            OWNER_ID: "101041126537973760",
            PREFIX: ".",
            ignore_channels: ["397961894654246913"]
        };
        return config;
    }else{
        const conf = require('./../config.js');
        var config = conf.config;;
        return config;
    }
};
