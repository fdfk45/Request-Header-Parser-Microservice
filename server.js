var http = require("http"),
    express = require("express"),
    path = require("path"),
    app = express(),
    lan,
    soft,
    realip;

app.set('port', (process.env.PORT || 9000))

app.use(express.static(path.join(__dirname, "public")));

app.get("/whoami", function (req, res) {

    if (req.headers['x-forwarded-for']) {

        realip = req.headers['x-forwarded-for'].split(',')[req.headers['x-forwarded-for'].split(',').length - 1];

    } else {

        realip = req.connection.remoteAddress;

    }

    lan = req.headers["accept-language"].split(",")[0];

    soft = req.headers['user-agent'].match(/\(.*\)/).join(",").split(")")[0];

    res.json({

        "ipaddress": realip,
        "language": lan,
        "software": soft.substring(1, soft.length)
    });

    res.end();

});

app.listen(app.get('port'), function () {

    console.log("Listening on port ", app.get('port'));

});
