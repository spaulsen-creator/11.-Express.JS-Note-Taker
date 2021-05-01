// const express = require('express');

// const app = express();

// // Sets an initial port. We will use this later in our listener
// const PORT = process.env.PORT || 8080;

// // Sets up the Express app to handle data parsing

// app.use(express.urlencoded({ extended: true }));

// app.use(express.json());
// //app.use(express.static(path.join(__dirname, 'public')));

// // ROUTER
// // The below points our server to a series of "route" files.
// // These routes give our server a "map" of how to respond when users visit or request data from various URLs.

// require('./routes/apiRoutes')(app);
// require('./routes/htmlRoutes')(app);

// // LISTENER
// // The below code effectively "starts" our server

// app.listen(PORT, () => {
//     console.log(`App listening on PORT: http://localhost:${PORT}`);
// });

// // app.get('/', function (req, res) {
// //     res.send('Hello World')
// //     })
// // app.listen(3000)


const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const fs = require('fs');
let db = require('./db/db.json');

const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// // connect to both route files using app.use
// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);

const path = require('path');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

  // api Routes
app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, './db/db.json')));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.post('/api/notes', (req, res) => {
  // const file = req.body;
  // console.log(file);

  db.push(req.body);
  // console.log(db);
  // const data = JSON.stringify(db);
  fs.writeFileSync('./db/db.json', JSON.stringify(db), (err) =>  err ? console.error(err) : console.log('Success!'))
});

// Listener
app.listen(PORT, () => console.log(`Server listening on: http://localhost:${PORT}`));

