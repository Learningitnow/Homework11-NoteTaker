// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const bodyParser= require("body-parser");
const fs = require("fs");
const db = require("./db/db.json");
const { v4: uuidv4 } = require('uuid');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;
app.use(express.static('public'))

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
//console.log(uuidv4());
app.get("/notes",function(req,res){
  res.sendFile(path.join(__dirname + "/public/notes.html"));
  console.log("now you are ate notes page")
});

app.post("/api/notes",function(req,res){
  var notes = req.body
  console.log(req.body);
  req.body.id=uuidv4()//a unique id;

  db.push(req.body)
  //you have the data
  console.log(db)
  //store into db.json file

 //fs write file
 fs.writeFile("./db/db.json", JSON.stringify(db), function(err) {

  if (err) {
    return console.log(err);
  }

  console.log("Success!");

});
res.json(db);


})


app.get("/api/notes",function(req,res){
  //you have to send back data
  //data  sent back is an array
  //each iteration is note (object)
  //wahtever it is it has to be an array of objects.. 
  //do we have that and what is it?
  res.json(db);
});

app.delete("/api/notes/:id",function(req,res){
  console.log(req.params.id);
  console.log("delete route starting")
  //now that i have my id
  //how to i remove something from an array

  //find the duck:id
  //by getting the location: index number
  //stick in hand in the bag
  //take out the duck (id) at the specific location:indexnumber (splice)
  for (let i = 0; i < db.length; i++) {
    console.log("forloop working")
    //whatever the specific duck matches the data from db
    if (req.params.id === db[i].id) {

      //get the index location: i
      //what do i need to get when I found the duck? indexlocation
      //i:index location 2
      //db[i]: duck

      //remove item use splice
      db.splice(i, 1);
      console.log(db)
      //update your file.. look at post if you forgot
        //fs write file
      fs.writeFile("./db/db.json", JSON.stringify(db), function(err) {

      if (err) {
        return console.log(err);
      }

      console.log("Success!");

    });

    }
  }
  res.json(db);
});



app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });