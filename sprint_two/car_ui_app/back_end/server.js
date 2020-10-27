//Creates the Back-End Express Server

//NOTES:
  //Route: section of Express code that associates an HTTP verb ( GET , POST , PUT , DELETE , etc.), a URL path/pattern, and a function that is called to handle that pattern
  //React router: to navigate within our app
  //Axios: communicate with our express server 
  //Express server: to communicate with our database
  //req: is short for request and contains the request data from our client. This is essentially how we get data from our front-end to our server. 
    //The data from our React frontend is contained in this req object and we use it here in our routes extensively to access the values. The data will be supplied to axios as a parameter as a javascript object.
    //For GET requests with an optional parameter, the data will be available with req.query. For PUT, POST and DELETE requests the data will be available directly in the body of the request with req.body. The data will be a javascript object and each property can be accessed with regular dot notation.
  //res: is short for response and contains the express server response. We want to send the response we get from our database to the client so we pass in the database response to this res function which then sends it to our client.
  //next: is middleware that allows you to pass callbacks to the next function.

const express = require('express')
const cors = require('cors');

const authRoute = require('./routes/auth');
const profileRoute = require('./routes/profile');
const uiRoute = require('./routes/ui_routes');
require('dotenv').config();

const app = express()
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(authRoute);
app.use(profileRoute);
app.use(uiRoute);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
