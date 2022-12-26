const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const { response } = require("express");
const app = express();
var https = require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us21.api.mailchimp.com/3.0/lists/f14f8b93e4";
  const options = {
    method: "POST",
    auth: "abhay101:afeecbe6198451e9cf11257cf392740c-us21",
  };


  const request = https.request(url, options, function () {

    if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
    }else{
        res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
   request.write(jsonData);
   request.end();
});

app.post("/failure", function(req, res){
    res.redirect("/");
 })

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running on port 3000");
});

//api key
//afeecbe6198451e9cf11257cf392740c-us21
//Audience-id
//f14f8b93e4
