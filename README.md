# Usersnack - mini project for usersnap

Two-teir applicaiton (Flask Backend, ReactJS Front end)

flask handles api calls and databse instance (loaded from a json file)

ReactJS handles props, json data to render fornt end, treated a saSingle page aplciaitons using react router to change display.


## project overview
The project is constructed with two seperate components:
-the "react-client" (for front-end).
-the "flask-server"  (for the back-end).
I have chosen to construct this project as a two-teir architecutre to not only enable cleaner code developemnt but for the eventuality of application scability and means of code reuse (the backend or frontend can be swapped out for new/older verison, or enable A/B testing each component while not having to use a single-tier application, for example).

Flask is used to manage the backend processing of API calls with a SQLite database, handling of GET, POST calls, processing of data for storage or retrival of data from the database, as well as the initial loading of data from the example JSON of the database upon starting the Flask server.

Meanwhile the frontend is constructed using ReactJS and Bootstrap. ReactJS handles the interfacing for the user, navigation of the routes and making the API calls to the flask server (GET/POST requests). All data is processed by the backend server for the fornt end to view. apart from form submission, there is no data processing handled by the front-end.

## Screenshots
![Home Page](https://github.com/dkthecoder/usersnack/blob/master/screenshots/home.png)
![Pizza's](https://github.com/dkthecoder/usersnack/blob/master/screenshots/pizzas.png)
![Pizza](https://github.com/dkthecoder/usersnack/blob/master/screenshots/pizza.png)
![Order's](https://github.com/dkthecoder/usersnack/blob/master/screenshots/orders.png)

## how to use the project
-start flask back-end: navigate to flask-server flder and run "python -m flask --app .\app.py run" in terminal.
-start react front-end: navigate to react-client folder and run "npm start" in terminal

To interact the app please naviagre your web browser to: http://localhost:3000/

## Components used in this project
-Bootstrap 
-Flask
-pyhon3
-reactjs
-sqlite3

## Project Limitations
-No user input verification
-No scrubbing of user-inputed information
-No CRUD factionality (no ability to modify orders made)
-Database is NOT persistant (orders will be lost)
-Uses localhost addressing for API calls
