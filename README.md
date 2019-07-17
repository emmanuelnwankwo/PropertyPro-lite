[![Build Status](https://travis-ci.com/emmanuelnwankwo/PropertyPro-lite.svg?branch=develop)](https://travis-ci.com/emmanuelnwankwo/PropertyPro-lite) [![Coverage Status](https://coveralls.io/repos/github/emmanuelnwankwo/PropertyPro-lite/badge.svg?branch=develop)](https://coveralls.io/github/emmanuelnwankwo/PropertyPro-lite?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/a9d51b8fa32df9caaa10/maintainability)](https://codeclimate.com/github/emmanuelnwankwo/PropertyPro-lite/maintainability)

# PropertyPro-lite
ProperyPro Lite is a platform where people can create and search properties for sale or rent

## Getting Started

### prerequisites
 The following tools are required to get the project running
 * [NPM](https://www.npmjs.com/)
 * [Node](https://nodejs.org/en/)

### Dependencies
* Express - Nodejs web server
* Body-parser - A middleware that collates request parameter and places them in the request body property
* Babel - Modern Javascript Transpiler

### Dev Dependencies
- Coveralls: Used for coverage test
- Eslint: Javacript linting package
- Airbnb: Javascript style guide
- Mocha: Testing Framework
- Chai and cha-http: Assetion libaries
- Nodemon: A package for automatically restarts the project when changes are made
- Morgan: For monitoring request details during development
- debug: An alternative to console.log

### How to Start the Project on local environment
* git clone  https://github.com/emmanuelnwankwo/PropertyPro-lite.git
* git checkout develop
* npm install
* touch .env && cp .env.example
* Add the postgress connectionString

### To get connectionString
* Visit [Elephantsql](https://www.elephantsql.com)
* create an account and then create a database instance
* In the .env, assign the connectionString to DATABASE_URL
* Run the migration

## Migration
### To generate the database tables
- npm run migrate

### To drop the tables
- npm run migrate:reset

### How to run the automated test
* npm test

### API Docs
* [API Documentation](https://propertypro-lit.herokuapp.com/api/docs/)

### User Interface
The UI is hosted on gh-pages
* [Landing Page](https://emmanuelnwankwo.github.io/PropertyPro-lite/UI/index)

### Features
- User can sign up.
- User can sign in.
- User (agent) can post a property advert.
- User (agent) can update the details of a property advert.
- User (agent) can mark his/her posted advert as sold.
- User (agent) can delete a property advert.
- User can view all properties adverts.
- User can view all properties of a specific type - 2 bedroom, 3 bedroom, mini flat etc.
- User can view a specific property advert.

### Optional Features
- User can reset password.
- Flag/report​ a posted AD as fraudulent.
- User can add multiple pictures to a posted ad.
- The application should display a Google Map with Marker showing the red-flag or intervention location.
