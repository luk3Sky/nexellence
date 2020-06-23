[![Build Status](https://travis-ci.org/luk3Sky/nexellence.svg?branch=client-react-dev)](https://travis-ci.org/luk3Sky/nexellence)

# Nexellence 

Nexcellence is a Smart Educational Institute CMS for managing student enrollments, courses and staff built with React, Node.js, and the Lightning Design System. It is written using ECMAScript 6 on the client and on the server (leveraging the new ES6 support of Node.js 4).

The back-end is built with **Node.js** using a **MySQL** database. 

## Local Installation

Follow the instructions below if you prefer to install the application on your local machine:

1. Install the latest version of [Node.js](https://nodejs.org). This application requires Node.js 4.x.

2. Install and setup [MySQL](https://www.mysql.com/) locally .

3. (Optional) Start MySQL and create a database called **nexcellence**.

4. Clone this repository or download and unzip [this](https://github.com/luk3Sky/nexellence/archive/master.zip) zip file.

5. Navigate to the **nexcellence** directory and install the project dependencies:

    ```
    npm run install:full
    ```

6. Open **server/config.js** and make sure the **databaseURL** matches your configuration (use your user name)

7. Type the following command to start the production application (both the front-end and the back-end `concurrently`):
    
    ```
    npm start
    ```
    
    The database is automatically populated with some initial data.

8. Open a browser and access [http://localhost:3000](http://localhost:3000)

## Developer Environment

The developer environment supports linting, styling with ESLint, Prettier, Husky and Lint-Staged configs so that every developer environment is in sync with a working stage which helps to keep consistency in check. 

Follow the instructions below to run the developer environment:

1. Type the following command to build the client developer server:

    ```
    npm run client:dev
    ```
    
    The project is written using ECMAScript 6 including ECMAScript 6 modules.

2. Type the following command to start the backend developer server:
    
    ```
    npm run dev
    ```
    
3. Open a browser and access the client server on [http://localhost:3000](http://localhost:3000) and the backend REST api can be accessed on [http://localhost:5000](http://localhost:5000)

**Caution! If a git commit fails, please don't force the commit instead of fixing the bug you already have.**

## Automatic Deployment to Heroku

1. Make sure you are logged in to the [Heroku Dashboard](https://dashboard.heroku.com)

1. Click the Button below to deploy the application on Heroku.

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

Your own instance of the application is automatically deployed, and your own MySQL database is populated with sample data.

### Version

Nexellence v1.1.1
