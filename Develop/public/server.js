const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


require("./apiRoutes")(app);
require("./htmlRoutes")(app);

// *** CONNECT TO PORT ***
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

