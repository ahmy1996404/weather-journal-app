// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express")

// Start up an instance of app
const app = express();

/* Middleware*/
const cors =  require("cors")
const bodyParser = require("body-parser")

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'));


app.post('/insert',function (req ,res) {
    const {feel , temperature , date } = req.body;
    projectData.feel = feel;
    projectData.temperature = temperature.main.temp;
    projectData.date = date;
    console.log(projectData);

    res.send(projectData);

});

app.get("/temperature", function (req , res) {
res.send(projectData);
})

// Setup Server
app.listen("3000", function () {
console.log("running on http://localhost:3000/")
})