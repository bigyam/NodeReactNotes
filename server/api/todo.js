var express = require('express');
var ToDo = require('../models/todo');

var router = express.Router();

router.get('/', function (req, res) {
	ToDo.retrieveAll(function (err, toDo) {
		if (err)
			return res.json(err);
		return res.json(toDo);
	});
});

router.post('/', function (req, res) {
	var toDo = req.body.toDo;

	ToDo.insert(toDo, function (err, result) {
		if (err)
			return res.json(err);
		return res.json(result);
	});
});

router.put('/', function (req, res) {
	var toDoId = req.body.toDoId;
	var completedBool = req.body.completedBool;

	ToDo.update(toDoId, completedBool, function (err, result) {
		if (err)
			return res.json(err);
		return res.json(result);
	});
});

router.delete('/', function (req, res) {
	var toDoId = req.body.toDoId;
	
	ToDo.delete(toDoId, function (err, result) {
		if (err)
			return res.json(err);
		return res.json(result);
	});
});

module.exports = router;