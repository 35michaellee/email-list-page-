//jshint esversion: 6
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const app = express();
app.use(express.static("public"))
app.use(bodyParser.urlencoded({
  extended: true
}));



app.get("/", function(req, res) {

  res.sendFile(__dirname + "/signup.html");
  //console.log(res);
});







app.post('/', function(req, res) {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;
  console.log(firstName, lastName, email);
  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      }

    }]
  };
  var jsdonData = JSON.stringify(data);



  var options = {
    url: "https://us20.api.mailchimp.com/3.0/lists/19e553888b",
    method: "POST",
    headers: {
      "Authorization": "Michael1 a727db9e88a9a946f045066a8beda22a-us20"

    },
    body:jsdonData,
  };
  request(options, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
      //console.log("error


    } else if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

  });

})


app.post("/failure", function(req,res){

  res.redirect("/");
})



app.listen(process.env.PORT || 3000, function() {  //process.env.PORT is for a dynamic port for Huroku OR on 3000 for local host
  console.log("Server is running on port 3000");
});



//a727db9e88a9a946f045066a8beda22a-us20
//19e553888b
