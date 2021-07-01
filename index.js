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

//app.get('/movies', (req, res) => {
//  res.json(topMovies);   //JSON object containing data about top 10 movies.
//});

//////////////////////////////////////////////Task 2.5///////////////////////////////
// <!-- 1.Return a list of all movies to the user-->
app.get('/movies', (req, res) => {
  res.json(topMovies);   //JSON object containing data about top 10 movies.
});

//  <!--2. Return data about a single movie-->
app.get('/movies/:moviename', (req, res) => {
  res.send('Successful GET request returning the data about a single movie');
});
//<!--3.Return a list of movies of a particlular genre -->
app.get('/movies/genres/:genre', (req, res) => {
  res.send('Successful GET request returning a list of movies of a genre');
});
//  <!--4.Return data about a director-->
app.get('/directors/:directorName', (req, res) => {
  res.send('Successful GET request returning the data about a single director');
});
//  <!--5.Allow new users  to register-->
app.post('/users/:username', (req, res) => {
  res.send('App is underconstruction.Come back later');
});
//  <!--6.Allow users to update their information-->
app.put('/users/:username', (req, res) => {
  res.send('Updated user information Successfully');
});
//   <!--7. Allow users to add a movie to their favourite list-->
app.post('/users/:username/movies/:moviename', (req, res) => {
  res.send('Added movie to favourites Successfully');
});
//<!--8. Allow users to remove a movie to their favourite list-->
app.delete('/users/:username/movies/:moviename', (req, res) => {
  res.send('Deleted movie from favourites Successfully');
});
//  <!--9. Allow users to deregester-->
app.delete('/users/:username', (req, res) => {
  res.send('Deleted user Successfully');
});
//////////////////////////END of task 2.5////////////////////////////////////////////
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
