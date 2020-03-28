# Nexcellence

Nexcellence is an Educational Institue CMS for managing student enrollments, courses and staff with React, Node.js, and the Lightning Design System. It is written using ECMAScript 6 on the client and on the server (leveraging the new ES6 support of Node.js 4).

The back-end is built with **Node.js** using a **MySQL** database. 

## Local Installation

Follow the instructions below if you prefer to install the application on your local machine:

1. Install the latest version of [Node.js](https://nodejs.org). This application requires Node.js 4.x.

2. Install and setup [MySQL](https://www.mysql.com/) locally 

3. Start MySQL and create a database called **nexcellence**.

4. Clone this repository or download and unzip [this](https://github.com/luk3Sky/nexellence/archive/master.zip) zip file.

5. Navigate to the **nexcellence** directory and install the project dependencies:

    ```
    npm install
    ```

6. Open **server/config.js** and make sure the **databaseURL** matches your configuration (use your user name)

7. Type the following command to build the client application:

    ```
    npm run webpack
    ```
    
    The project is written using ECMAScript 6 including ECMAScript 6 modules.

8. Type the following command to start the server:
    
    ```
    npm start
    ```
    
    The database is automatically populated
    
9. Open a browser and access [http://localhost:5000](http://localhost:5000)

## Developer Environment

The developer environment supports linting, styling with ESLint, Prettier, Husky and Lint-Staged configs so that every developer environment is in sync with a working stage which helps to keep consistency in check. 

**Caution! If a git commit fails, please don't force the commit instead of fixing the bug you already have.**
