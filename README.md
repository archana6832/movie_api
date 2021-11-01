MOVIE_API

A simple movie_api


# Project Description

This project involved creating a set of data for movies, movie title, description of the movie, image of the movie, genre and directors. In order to access the information further code was added to create a new user, update user details and to login. The users then have the ability to add and remove favourite movies to their profile.

Additional issues around security were addressed using validation and authentication. These were addressed by ensuring valid information is input into the related registration fields, authorisation tokens are added to login details and passwords are hashed and unretrievable to other users (including admin).

Initially the data in the app was accessed through a local host server later MongoDB Atlas is used to host the database.

## Links
https://myflix-moviesapp.herokuapp.com/
https://myflix-moviesapp.herokuapp.com/documentation.html
https://github.com/archana6832/movie_api

## Project Dependencies

* Javascript - server architecture, middleware, endpoint functions.
* MongoDB - data collections created with movies and users.
* Express - middleware for body parsing, validation, unique ID creation, passport authentication,
 encryption (bcrypt), morgan (logger tool) and CORS (to limit origin access).
* Postman - an app used to test endpoints and to test functionality for the various HTTP methods.
* MongoDB Atlas - Database online by MongoDB Atlas.
* Heroku - API online by Heroku.
