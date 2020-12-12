const express = require('express');
const router = express.Router();

const connection = require('../database');
const compararPassword = require('../logic/compararPassword');
const crearToken = require('../logic/crearToken');

router.post('/auth', (req, res) => {
	const { email, password } = req.body;

	connection.query(
		'select * from usuario where emailUsuario = ?;',
		[email],
		async (err, rows, fields) => {
			if (err) {
				return res.json({
					success: false,
					error: err,
				});
			}

			if (rows.length < 1) {
				return res.json({
					succes: false,
					mensaje: 'El usuario no existe',
				});
			}

			const usuario = rows[0];

			// la contraseña coincide
			const coincide = await compararPassword(
				usuario.passwordUsuario,
				password
			);
			if (!coincide) {
				return res.json({
					succes: false,
					mensaje: 'La contraseña es incorrecta',
				});
			}

			const token = crearToken(usuario);

			res.json({
				success: true,
				token,
			});
		}
	);
});

// TODO
router.get('/auth', (req, res) => {
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
