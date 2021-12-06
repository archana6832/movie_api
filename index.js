  const express = require('express');    //Require express
  const morgan = require('morgan');
  const bodyParser = require('body-parser');
  const { check, validationResult } = require('express-validator');
  //Requiring mongoose for integration
  const mongoose = require('mongoose');
  const Models = require('./models.js');

  const Movies = Models.Movie;
  const Users = Models.User;
  const app = express();

  app.use(express.json());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

//including CORS that allows all domain
  const cors = require('cors');
  app.use(cors());


  let auth = require('./auth')(app); // to import auth.js file into the project

  const passport = require('passport'); //to require the Passport module
  require('./passport');                //to import the passport.js file


  // Integrating Mongoose with REST API
  //mongoose.connect('mongodb://localhost:27017/myFlixDB',
  //{ useNewUrlParser: true, useUnifiedTopology: true });

  mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  // Middleware library to log all requests in terminal
  app.use(morgan('common'));

  //To Serve Static Files
  app.use(express.static('public'));

  //////////////////////////////////////////////Task 2.9///////////////////////////////
  // <!---Welcome message-->
  app.get('/', (req, res) => {
    res.send('Welcome to myFlix');
  });

  // <!-- 1.Return a list of all movies to the user-->
  app.get('/movies', passport.authenticate('jwt', { session: false }), function (req, res) {
  Movies.find()
    .then(function (movies) {
      res.status(201).json(movies);
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).send('Error: '+ error);
    });
});

  // <!-- Return a list of all  users-->
    app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.find()
    .then ((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
  });
  //Gets a user by username
app.get('/users/:Username', passport.authenticate('jwt', {session: false}), (req, res) => {
  Users.findOne({ Username: req.params.Username })
  .then((user) => {
    res.json(user);
  })
  .catch((err) => {
    console.error(err);
  res.status(500).send('Error: ' + err);
  });
});
  //  <!--2. Return data about a single movie by title-->
  app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.findOne({ Title: req.params.Title })
    .then ((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
  });
  //<!--3.Return data about a genre (description) by name/title -->
  app.get('/movies/genres/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.findOne({ 'Genre.Name': req.params.Name })
    .then ((genre) => {
      res.json(genre.Genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
  });

  //  <!--4.Return data about a director-->
  app.get('/directors/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.findOne({ 'Director.Name': req.params.Name })
    .then ((director) => {
      res.json(director.Director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
  });
  //  <!--5.Allow new users  to register-->
  app.post('/users', [
    //Validation Logic
    check('Username', 'Username is required').isLength({min: 5}),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
  ], (req, res) => {
    // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

  let hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
    .then((user) => {
      if (user) {
      //If the user is found, send a response that it already exists
        return res.status(400).send(req.body.Username + ' already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) => { res.status(201).json(user) })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});
  //  <!--6.Allow users to update their information-->
  app.put('/users/:Username',
    [
      check('Username', 'Username must contain at least 5 characters.').isLength({min: 5}),
      check('Username', 'Username must only contain alphanumeric characters.').isAlphanumeric(),
      check('Password', 'Password must contain at least 8 characters.').isLength({min: 8}),
      check('Email', 'Email must be a valid email address.').isEmail()
    ],
    passport.authenticate('jwt', {session: false}), (req, res) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }
    Users.findOneAndUpdate(
      {Username: req.params.Username},
      {$set: {
        Username: req.body.Username,
        Password: Users.hashPassword(req.body.Password),
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
      },
      {new: true}
      )
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      })
  });
  //   <!--7. Allow users to add a movie to their favourite list-->
  app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, {
      $push: { FavoriteMovies: req.params.MovieID }
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
  });
  //<!--8. Allow users to remove a movie to their favourite list-->
  app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, {
      $pull: { FavoriteMovies: req.params.MovieID }
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);

      }
    });
  });
  //  <!--9. Allow existing users to deregester-->
  app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
  });


  //////////////////////////END of task 2.9////////////////////////////////////////////


  // Middleware function for error handling
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  // listen for requests
  const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});
