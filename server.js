var http = require("http"),
    express = require("express"),
    path = require("path"),
    ip = require("ip"),
    app = express(),
    lan,
    soft,
    realip;

app.set('port', (process.env.PORT || 9000))

app.use(express.static(path.join(__dirname, "public")));

app.get("/whoami", function (req, res) {

    realip = req.headers['x-forwarded-for'].split(',');

    lan = req.headers["accept-language"].split(",")[0];

    soft = req.headers['user-agent'].match(/\(.*\)/).join(",").split(")")[0];

    res.json({

        "ipaddress": realip[realip.length - 1],
        "language": lan,
        "software": soft.substring(1, soft.length)
    });

    res.end();

});

app.listen(app.get('port'), function () {

    console.log("Listening on port ", app.get('port'));

});
