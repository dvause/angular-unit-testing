var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');

mongoose.connect('mongodb://localhost/test');

var personSchema = {
  firstName: { type: String, required: true},
  lastName: {type: String, required: true},
  email: {type:String, required:true}
};

var Person = mongoose.model('Person', personSchema, 'people');

var app = express();
app.use(cors());
app.use(express.bodyParser());
app.use(express.methodOverride());

/* Get all records */
app.get('/people', function(req, res) {
	Person.find(function(err, doc) {
    if (err) {
      console.log(err);
    } else {
      return res.send(doc);
    }
	});
});

/* Get a single record by id */
app.get('/people/:id', function(req, res) {
  Person.findById(req.params.id, function(err, doc) {
    if (err) {
      console.log(err);
    } else {
      return res.send(doc);
    }
  })
});

/* Create a new record */
app.post('/people', function(req, res) {
  var person = new Person({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  });
  person.save(function(err) {
    if (err) {
      console.log(err);
    }
    return res.send(person);
  })
});

/* Update a single record */
app.put('/people/:id', function(req, res) {
  return Person.findById(req.params.id, function(err, person) {
    console.log(person);
    if (err) {
      console.log(err);
    } else {
      person.firstName =  req.body.firstName;
      person.lastName = req.body.lastName;
      person.email = req.body.email;
      person._id = req.params.id;
      return person.save(function(err) {
        if (err) {
          console.log(err);
        } else {
          return res.send(person);
        }
      })
    }
  });
});

/* Delete a single record */
app.delete('/people/:id', function(req, res) {
  return Person.findByIdAndRemove(req.params.id, function(err, doc) {
    if (err) {
      return console.log(err);
    } else {
      return res.send(doc);
    }
  });
});

app.listen(3500);
console.log("Listening on port 3500");
