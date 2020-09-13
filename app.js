var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'contactdb'
});

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/public/contactus.html'));
});


app.post('/auth', function(request, response) {
	var firstname = request.body.firstname;
	var lastname = request.body.lastname;
  var email = request.body.email;
  var message = request.body.message;

	if (firstname && lastname && email && message) {
    let query = "INSERT INTO `accounts` (firstname, lastname, email, message) VALUES ('" +
                                firstname + "', '" + lastname + "', '" + email + "', '" + message + "')";
                                connection.query(query, function(error, results, fields) {

                            				response.redirect('/temp');

                            			response.end();
                            		});

	} else {
		response.send('Please enter your information !');
		response.end();
	} 
});

app.get('/temp', function(request, response) {
   response.sendFile(path.join(__dirname + '/public/temp.html'));
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port,function(){
	console.log("Server has started successfully...");
});
