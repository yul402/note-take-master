// 01-05 express - get
const express = require('express');
const app = express();

    // GET method for a route
    // send a HTML element (paragprah in this case)
    app.get('/', (req, res) => {
        res.send(
        `<p>API - An application programming interface, is a computing interface that defines interactions between multiple software intermediaries</p>`
        );
    });

    //sendFile
    //path library
    app.get('/routes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/routes.html'))
    );

    //send json format
    app.get('/api', (req, res) => {
        res.json({
        term: 'api',
        description:
            'An application programming interface, is a computing interface that defines interactions between multiple software intermediaries',
        });
    });

    // Fallback route for when a user attempts to visit routes that don't exist
    // *
    app.get('*', (req, res) =>
        res.send(
            `Make a GET request using Insomnia to <a href="http://localhost:${PORT}/api/terms">http://localhost:${PORT}/api/terms</a>`
        )
        );

    // GET route that returns any specific term
    // :term
    app.get('/api/terms/:term', (req, res) => {
        // Coerce the specific search term to lowercase
        const requestedTerm = req.params.term.toLowerCase();
  
    // Iterate through the terms name to check if it matches `req.params.term`
        for (let i = 0; i < termData.length; i++) {
        if (requestedTerm === termData[i].term.toLowerCase()) {
            return res.json(termData[i]);
        }
        }
    })


// 07 - Integrate with javaScript for action
// classList.add('card', 'p-5')
// Used to add/remove/toggle


// 19 - Data-Persistence
// HTML/JavaScript/Server
// POST data from HTML/JavaScript user input
// Store posted data


// 09 Allows us to reference files with their relative path
app.use(express.static('public'));

// 13 post
app.post('/api/reviews', (req, res) => {
    // Let the client know that their POST request was received
    res.json(`${req.method} request received`);
  
    // Show the user agent information in the terminal
    console.info(req.rawHeaders);
  
    // Log our request to the terminal
    console.info(`${req.method} request received`);
  });

  // 15 - Middleware
  // Middleware for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

    //uuid
    const uuid = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }; 


// 21 Modular Routing
// Send all the requests that begin with /api to the index.js in the routes folder
const api = require('./routes/index');
app.use('/api', api);

//23 Custom Middleware
const middleware = (req, res, next) => {
    // ANSI escape code that instructs the terminal to print in yellow
    const yellow = '\x1b[33m%s\x1b[0m';  
    // Log out the request type and resource
    console.log(yellow, `${req.method} request to ${req.path}`);
    // Built-in express method to call the next middleware in the stack.
    next();
  };
  
  app.use(middleware);