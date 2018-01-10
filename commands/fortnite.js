const https = require('https');

exports.execute = (client, message, args) => {
    var name = args[1];

    if(name === "" || name === null){
        const emoji = client.emojis.find("name", "aaa");
        message.channel.send(`Illegal argument ${emoji}`);
        return;
    }

    var options = {
        host: 'api.fortnitetracker.com',
        path: '/v1/profile/pc/' + name,
        port: 443,  // isnt this used for mail?
        method: 'GET',
        headers: { 'TRN-Api-Key': client.config.TRN_APIKEY }
    };

    var req = https.request(options, function(res){
        var body = "";
        res.on('data', function(data){
            body += data;
        });
        res.on('end', end => {
            body = JSON.parse(body);
            //console.log(body);    // debug
            // player not found
            if(body.error){
                const emoji = client.emojis.find("name", "feelsbadman");
                message.channel.send(`Player not found ${emoji}`);
                return;
            }
            // player found
            var platform = body["platformName"];
            var score = body.lifeTimeStats[6]["value"];
            var matchesPlayed = body.lifeTimeStats[7]["value"];
            var wins = body.lifeTimeStats[8]["value"];
            var timePlayed = body.lifeTimeStats[13]["value"];
            var kills = body.lifeTimeStats[10]["value"];
            var kd = body.lifeTimeStats[11]["value"];
            var killsPerMin = body.lifeTimeStats[12]["value"];
            var url = "https://fortnitetracker.com/profile/pc/" + name;


            var msg = "";
            msg += "\nwins: " + wins;
            msg += "\ngames: " + matchesPlayed;
            msg += "\nkills: " + kills + " (" + killsPerMin + "/min)";
            msg += "\nkd: " + kd;
            msg += "\n\nplaytime: " + timePlayed;

            message.channel.send({embed:
                {
                    color: 9955331, // wtf color code???
                    title: "",
                    url: url,
                    author: {
                        name: name + " ("+ platform +")",
                        icon_url: "https://cdn2.unrealengine.com/Fortnite%2Fhome%2Ffn_battle_logo-1159x974-8edd8b02d505b78febe3baacec47a83c2d5215ce.png"
                    },
                    title: "",
                    description: msg,
                }
            });
        });
    });

    req.end();
};

exports.info = {
    name: "fortnite",
    alias: ["fn", "f"],
    permission: "default"
};
