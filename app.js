var config = require("./config.json");
var jwt = require('jsonwebtoken');
var bodyparser = require('body-parser');
var express = require("express");
var app = express();
var port = config.port;
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: false
}));

app.post('/api/sts', function(req, res) {
  console.log(req.headers);
  if(req.body && req.body.appId && req.headers && req.headers.apikey){
    var clientId = req.body.clientId;//req.body.clientId;
    var clientSecret = req.body.clientSecret;//req.body.clientSecret;
    var sub = req.body.identity;
    var iat = new Date()/1000;
    var exp = iat+parseInt(7200);
    var options = {
      "iat": iat,
      "exp": exp,
      "iss": clientId,
      "sub" : sub
    }
    var token = jwt.sign(options, clientSecret);
    res.header("Access-Control-Allow-Origin","*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  res.header("Referrer-Policy","origin-when-cross-origin, strict-origin-when-cross-origin");
	  res.header("Content-Security-Policy","default-src 'none'");
    res.status(200).send({"jwt":token});
  } else {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Referrer-Policy","origin-when-cross-origin, strict-origin-when-cross-origin");
    res.header("Content-Security-Policy","default-src 'none'");
    res.status(401).send({"Unauthorized": "Mandatory parameters missing"});
  }
        
  });

app.post('/api/public', function(req, res) {
  console.log(req.headers);
  if(req.body && req.body.appId && req.headers && req.headers.apikey){
    var clientId = req.body.appId;//req.body.clientId;
    var clientSecret = req.headers.apikey;//req.body.clientSecret;
    var iat = new Date()/1000;
    var exp = iat+parseInt(1200);
    var options = {
      "iat": iat,
      "exp": exp,
      "appId": clientId
    }
    var token = jwt.sign(options, clientSecret);
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Referrer-Policy","origin-when-cross-origin, strict-origin-when-cross-origin");
    res.header("Content-Security-Policy","default-src 'none'");
    res.status(200).send({"jwt":token});
  } else {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Referrer-Policy","origin-when-cross-origin, strict-origin-when-cross-origin");
    res.header("Content-Security-Policy","default-src 'none'");
    res.status(401).send({"Unauthorized": "Mandatory parameters missing"});
  }
});

console.log("JWT service request received" + port);
app.listen(port);
