var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');

mongoose.connect('mongodb://localhost/test');

var personSchema = {
	firstName:String,
	lastName:String,
	email:String
};

var Person = mongoose.model('Person', personSchema, 'people');

var app = express();
app.use(cors());

app.get('/people', function(req, res) {
	Person.find(function(err, doc) {
		res.send(doc);
	});
});

app.listen(3500);
