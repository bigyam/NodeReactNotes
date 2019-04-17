const db = require('../database');

class ToDo {
	static retrieveAll (callback) {
		db.query('SELECT title, completed from toDoTable', function (err, res) {
			if (err.error)
				return callback(err);
			callback(res);
		});
	}

	static insert (toDo, callback) {
		db.query('INSERT INTO toDoTable (title, completed) VALUES ($1, false)', [toDo], function (err, res) {
			if (err.error)
				return callback(err);
			callback(res);
		});
	}
}

module.exports = ToDo;