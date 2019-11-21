const fs = require("fs");

module.exports = function (app) {

    app.post("", function (req, res) {
        fs.appendFile("../db/db.json", res, function (err) {
            if (err) throw err;
            console.log("Appended!");
        });
        res.json(true)
    });

    // // maybe something like this to clear?
    // // but additionally it needs to be deleted based on an id value
    // app.post("/api/clear", function(req, res) {
    //     // Empty out the arrays of data
    //     tableData.length = 0;
    //     waitListData.length = 0;

    //     res.json({ ok: true });
    //   });

}