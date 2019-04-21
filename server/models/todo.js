const db = require('../database');

class ToDo {
	static retrieveAll (callback) {
		db.query('SELECT id, title, completed from toDoTable ORDER BY id DESC', function (err, res) {
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

	static update (toDoId, completedBool, callback) {
		db.query('UPDATE toDoTable SET completed = $1 WHERE id = $2', [completedBool, toDoId], function (err, res) {
			if (err.error)
				return callback(err);
			callback(res);
		});
	}

	static delete (toDoId, callback) {
		db.query('DELETE FROM toDoTable WHERE id = $1', [toDoId], function (err, res) {
			if (err.error)
				return callback(err);
			callback(res);
		});
	}
}

module.exports = ToDo;