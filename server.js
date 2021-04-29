// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality

const express = require('express');

// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server

// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port. We will use this later in our listener
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
// body-parser built into express v 4.16+ allows replacing ln 17 with ln 18 
// app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded());
app.use(express.json());

// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.

require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// LISTENER
// The below code effectively "starts" our server

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});

app.get('/', function (req, res) {
    res.send('Hello World')
    })
app.listen(8080)