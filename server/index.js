//call packages we need
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

var db = require('./database');

//set environment and port if none provided
//const ENV = process.env.NODE_ENV;
const ENV = 'production';
const PORT = process.env.PORT || 5000;

//configure app to use body parser.  let us get data from POST
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api/todo', require('./api/todo'));

if (ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/build')));
	app.use((req, res) => {
		res.sendFile(path.join(__dirname, '../client/build/index.html'));
	});
}

//start listen
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}...`);
});

//test
db.query('SELECT NOW()', (err, res) => {
	if(err.error)
		return console.log(err.error);
	console.log(`PostgreSQL connected: ${res[0].now}.`);
});

module.exports = app;