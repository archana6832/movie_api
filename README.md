MOVIE_API

A simple movie_api


# Project Description

This project involved creating a set of data for movies, movie title, description of the movie, image of the movie, genre and directors. In order to access the information further code was added to create a new user, update user details and to login. The users then have the ability to add and remove favourite movies to their profile.

Additional issues around security were addressed using validation and authentication. These were addressed by ensuring valid information is input into the related registration fields, authorisation tokens are added to login details and passwords are hashed and unretrievable to other users (including admin).

Initially the data in the app was accessed through a local host server later MongoDB Atlas is used to host the database.

## Key Features

- The API is an Express application with a server that connects to a non-relational database.
- Schemas created using Mongoose define the structure of the database records for each collection. The schemas are implemented via models used within HTTP request handlers. 
- The API endpoints handle HTTP requests to perform a variety of CRUD operations on the data. User records can be created, read, updated and deleted. Movie data can be read. User records include an array of favourite movies and endpoints exist to allow users to add or remove movies from their favourites. 
- Requests to endpoints are protected by authentication and authorisation strategies implemented using Passport and jsonwebtoken.
- Data validation checks are performed when creating and updating user records using express-validator.

## Links
 https://myflix-moviesapp.herokuapp.com/


 https://myflix-moviesapp.herokuapp.com/documentation.html

 
 https://myflix-moviesapp.herokuapp.com/documentation.html


## Project Dependencies

* Javascript - server architecture, middleware, endpoint functions.
* MongoDB - data collections created with movies and users.
* Express - middleware for body parsing, validation, unique ID creation, passport authentication,
 encryption (bcrypt), morgan (logger tool) and CORS (to limit origin access).
* Postman - an app used to test endpoints and to test functionality for the various HTTP methods.
* MongoDB Atlas - Database online by MongoDB Atlas.
* Heroku - API online by Heroku.

## Installation and set up

This project requires Node.js to be installed. The documentation can be found [here](https://nodejs.org/en/).

To install myFlix run: 
```
npm install
```
- This will provide the code and modules required to set up myFlix. Next, you will need to create a unique database for your specific project and decide where your API will be hosted. 

- A database can be created and hosted locally using MongoDB or hosted using MongoDB Atlas, where you can also create databases and collections directly. In order to recreate myFlix, two collections must be created: movies and users. Movies can be populated with movie data of your choice following the movieSchema defined in the models.js file. Similarly, any manual user records created should follow the userSchema.

- Once the database has been set up, the mongoose connect method in the index.js file must be updated to replace the current URI string with the URI of your database. Similarly, the port reference defined when setting up the server must be configured to reflect where the API is hosted. In the current code, the database URI and port number reference environment variables stored on Heroku and it is recommended environment variables saved outside git are used for these values to keep your application secure.

To launch myFlix locally run:
```
npm start
```
## Author
Github: [@archana6832](https://github.com/archana6832/movie_api)
