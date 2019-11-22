const fs = require("fs");
const path = require("path");

module.exports = function (app) {

    app.get("/api/notes", function (req, res) {
        return res.sendFile(path.join(__dirname, "./db/db.json"));
    });


    app.post("/api/notes", function (req, res) {
        let newNote = req.body;
        console.log
        console.log(newNote);


        let storedNotes;
        fs.readFile("./db/db.json", "utf-8", function (err, data) {
            if (err) throw err;
            console.log("data read from json file")
            console.log(data);
            storedNotes = JSON.parse(data)
            console.log(storedNotes);
            storedNotes.push(newNote);
            console.log(storedNotes);

            for (i = 0; i < storedNotes.length; i++) {

            }


        });





        // id = index for loop


        fs.writeFile("./db/db.json", JSON.stringify(newNote), function (err) {
            if (err) throw err;
            console.log("Appended!");
        });
        // return the new note to the client?
        res.json(true)
    });


    app.delete("/api/notes/:id", function (req, res) {
        let newStoredNotes;
        fs.readFile("./db/db.json", "utf-8", function (err, data) {
            if (err) throw err;
            // find the object with the id requested
            // delete it from the array
            // return new array without the deleted object
            // which means that at some point this object needs to be declared
            console.log("object deleted!")
            return newStoredNotes;
        });
        fs.writeFile("./db/db.json", newStoredNotes, function (err) {
            if (err) throw err;
            console.log("remaining objects appended!");
        });
        // return the new note to the client?
        res.json(true)
    });

}