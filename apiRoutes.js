const fs = require("fs");
const path = require("path");

module.exports = function (app) {

    // *** GET STORED NOTES AND RENDER THEM ***
    app.get("/api/notes", function (req, res) {
        return res.sendFile(path.join(__dirname, "./db/db.json"));
    });


    // saves all notes to json file (for POST and DELETE)
    function writeNotes(notes) {
        fs.writeFile("./db/db.json", JSON.stringify(notes), function (err) {
            if (err) throw err;
            console.log("Notes saved!");
        });
    };


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
        res.json(true)
    });


    app.delete("/api/notes/:id", function (req, res) {
        let deletedNote = req.params.id

        fs.readFile("./db/db.json", "utf-8", function (err, data) {
            if (err) throw err;

            let storedNotes = JSON.parse(data)
            storedNotes.splice(deletedNote - 1, 1);
            // restore ids for all elements of the array
            for (i = 0; i < storedNotes.length; i++) {
                storedNotes[i].id = i + 1;
            };
        
            console.log("object deleted!")
            writeNotes(storedNotes);
        });
        res.json(true)
    });

}