const express = require('express');
const router = express.Router();

const connection = require('../database');

router.get('/auditoria', (req, res) => {
	connection.query('select * from auditoria;', (err, rows, fields) => {
		if (err) {
			return res.json({
				success: false,
				error: err,
			});
		}
		res.json({
			success: true,
			data: rows,
		});
	});
});

module.exports = router;
