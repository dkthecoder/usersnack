# Usersnack - mini project for usersnap
A two-tier application to demonstration the presentation and retrieval of data between a front-end and back-end.

## project overview
The project is constructed with two separate components:
-the "react-client" (for front-end).
-the "flask-server” (for the back-end).
I have chosen to construct this project as a two-tier architecture to not only enable cleaner code development but for the eventuality of application scalability and means of code reuse (the backend or frontend can be swapped out for new/older version or enable A/B testing each component while not having to use a single-tier application, for example).

Flask is used to manage the backend processing of API calls with a SQLite database, handling of GET, POST calls, processing of data for storage or retrieval of data from the database, as well as the initial loading of data from the example JSON of the database upon starting the Flask server.

Meanwhile the frontend is constructed using ReactJS and Bootstrap. ReactJS handles the interfacing for the user, navigation of the routes and making the API calls to the flask server (GET/POST requests). All data is processed by the backend server for the front end to view. apart from form submission, there is no data processing handled by the front-end.

## Screenshots
![Home Page](https://github.com/dkthecoder/usersnack/blob/master/screenshots/home.png)
![Pizza's](https://github.com/dkthecoder/usersnack/blob/master/screenshots/pizzas.png)
![Pizza](https://github.com/dkthecoder/usersnack/blob/master/screenshots/pizza.png)
![Order's](https://github.com/dkthecoder/usersnack/blob/master/screenshots/orders.png)

## how to use the project
-Start flask back-end: navigate to flask-server folder and run "python -m flask --app .\app.py run" in terminal.
-Start the React front-end: navigate to react-client folder and run "npm start" in terminal

To interact with the app once it’s loaded, please navigate your web browser to: http://localhost:3000/

## Components used in this project
-Bootstrap 
-Flask
-Python3
-ReactJS
-SQLite3

## Project Limitations
-No user input verification.
-No scrubbing of user-inputted information.
-No CRUD functionality (no ability to modify orders made).
-Database is NOT persistent (orders will be lost).
-Uses localhost addressing for API calls.

### known Issue
-Total price does not work...
