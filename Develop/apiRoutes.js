const fs = require("fs");
const path = require("path");

module.exports = function (app) {

    // *** GET STORED NOTES AND RENDER THEM ***
    app.get("/api/notes", function (req, res) {
        return res.sendFile(path.join(__dirname, "./db/db.json"));
    });

    // *** POST NEW NOTES ***
    app.post("/api/notes", function (req, res) {
        let newNote = req.body;

        fs.readFile("./db/db.json", "utf-8", function (err, data) {
            if (err) throw err;
            let storedNotes = JSON.parse(data)
            storedNotes.push(newNote);
            // create a unique id for each note saved
            for (i = 0; i < storedNotes.length; i++) {
                storedNotes[i].id = i + 1;
            };
            writeNotes(storedNotes);
        });

        // saved all notes to json file
        function writeNotes(notes) {
            fs.writeFile("./db/db.json", JSON.stringify(notes), function (err) {
                if (err) throw err;
                console.log("Notes saved!");
            });
        };

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