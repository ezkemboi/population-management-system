[![Build Status](https://travis-ci.org/ezrqnkemboi/population-management-system.svg?branch=master)](https://travis-ci.org/ezrqnkemboi/population-management-system)
[![Maintainability](https://api.codeclimate.com/v1/badges/0eeac37a33c486841617/maintainability)](https://codeclimate.com/github/ezrqnkemboi/population-management-system/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/ezrqnkemboi/population-management-system/badge.svg?branch=master)](https://coveralls.io/github/ezrqnkemboi/population-management-system?branch=master)

# Population Management System

Population managment system for managing populations. 
Any user can use this app without Authorization to create location populations, list them, update or delete them. 
All tests can be done majorly using `Postman`. 

NB: When running application, make sure that `node` and `sqlite` are installed. 

# How to Run the app

- Clone: `git clone https://github.com/ezrqnkemboi/population-management-system.git`
- change directory: `cd population-management-system`
- Install dependancies: `npm install`
- Start the app: `npm start`
- Run test: `npm test`

NB: When running `npm start`, sqlite will create a db `dev.db` and when running `npm test`, then sqlite will create test database `test.db`. 
All these are ignored. 

Also, note that there is no command that deletes any db created automatically. For example, some tests will fail when you run tests more than once. To run test for more than once, delete the `test.db` file. 

# Expected Endpoints

|Endpoint                            | Functionality                    |HTTP method 
|------------------------------------|----------------------------------|-------------
|/locations                       |Add a location                       |POST        
|/locations  |Get all locations   |GET 
|/locations/:id               |Get a single locations        |GET 
|/locations/:id                 |Edit location/update location       |PUT   
|/locations/:id             |Delete/remove a location                   |DELETE

# Contributor 

[Ezrqn Kemboi](https://github.com/ezrqnkemboi)