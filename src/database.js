const mysql = require('mysql');

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'adal',
	database: 'supersistema',
});

connection.connect((err) => {
	if (err) {
		console.log(err);
		return;
	} else {
		console.log('conectado a db');
	}
});

module.exports = connection;
