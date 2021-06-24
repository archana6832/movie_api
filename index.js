const express = require('express'),    //Require express
morgan = require('morgan');

const app = express();

// Top 10 movies
let topMovies = [
  {
    title: 'The Shawshank Redemption',
    director: 'Frank Darabont'
  },
  {
    title: 'The Godfather',
    director: 'Francis Ford Coppola'
  },
  {
    title: 'The Dark Knight',
    director: 'Christopher Nolan'
  },
  {
    title: ' Forrest Gump',
    director: 'Robert Zemeckis'
  },
  {
    title: 'Inception',
    director: 'Christopher Nolan'
  },
  {
    title: 'Interstellar',
    director: 'Christopher Nolan'
  },
  {
    title: 'The Pianist',
    director: 'Roman Polanski'
  },
  {
    title: 'The Lion King',
    director: 'Roger Allers'
  },
  {
    title: 'Untouchable',
    director: 'Olivier Nakache'
  },
  {
    title: 'Coco',
    director: 'Lee Unkrich'
  }
];

// Middleware library to log all requests in terminal
app.use(morgan('common'));

//To Serve Static Files
app.use(express.static('public'));


// GET route  for Top 10 movies
app.get('/movies', (req, res) => {
  res.json(topMovies);   //JSON object containing data about top 10 movies.
});

// GET route for default textual response
app.get('/', (req, res) => {
  res.send('Welcome to myFlix!');
});

// Middleware function for error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080, () =>{
  console.log('Your app is listening on port 8080.');
});
