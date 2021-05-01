const fs = require("fs");
const path = require("path");
const uuid = require('uuid');


// ROUTING
module.exports = (app) => {
  //sets up route
  app.get("/api/notes", (req, res) => {
    // Reads db.json, returns saved notes as JSON.
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw err;
      // parses the json string into a js object
      res.json(JSON.parse(data));
    })
  })



  //sets up post route
  app.post("/api/notes", (req, res) => {
    //note added to db.json, note returned to user
    const createNote = req.body;
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw err;
      // parses the json string into a js object
      const notes = JSON.parse(data);
      createNote.id = uuid.v4(); //adding properties to object 
      notes.push(createNote);
      fs.writeFile("./db/db.json", JSON.stringify(notes), "utf8", (err, data) => {
        return res.json(createNote)
      })
    })
  });


  //deleting notes
  app.delete("/api/notes/:id", (req, res) => {
    const notes2 = JSON.parse(fs.readFileSync("./db/db.json"));
    const delNote = notes2.filter((rmvNote) => rmvNote.id !== req.params.id);
    fs.writeFileSync("./db/db.json", JSON.stringify(delNote));
    res.json(delNote)
  });
};