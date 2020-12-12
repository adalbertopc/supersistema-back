const express = require('express');
const router = express.Router();

const connection = require('../database');

//LEER TODOS LOS DE LA TABLA
//req request
router.get('/usuario', (req, res) => {
	//esta consulta si es exitosa retorna rows, si da error pues err xd
	connection.query('select * from usuario;', (err, rows, fields) => {
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

//LEER POR ID ESPECIFICO
router.get('/usuario/:id', (req, res) => {
	//para obtener el id de la url
	const { id } = req.params;
	//primero la query despues en un arreglo[id] los parametros de los signos ? y
	//despues igualmente ya retornar la respuesta json
	connection.query(
		'select * from usuario where idUsuario = ?;',
		[id],
		(err, rows, fields) => {
			if (err) {
				return res.json({
					success: false,
					error: err,
				});
			}

			res.json({
				success: true,
				data: rows[0],
			});
		}
	);
});

//AGREGAR UN NUEVO REGISTRO A LA TABLA
router.post('/usuario', (req, res) => {
	const { idUsuario, email, password, esAdmin } = req.body;
	//llamamos a nuestro procedimiento almacenado
	const query = `call agregarUsuario(?,?,?);`;

	connection.query(
		query,
		[idUsuario, email, password, esAdmin],
		(err, rows, fields) => {
			if (!err) {
				res.json({ status: 'producto agregado' });
			} else {
				console.log(err);
				res.json({ status: 'hubo un error inesperado' });
			}
		}
	);
});

//ACTUALIZAR UN REGISTRO
router.put('/producto/:id', (req, res) => {
	const { nombre, precio } = req.body;
	const { id } = req.params;
	const query = `call actualizarProducto(?,?,?);`;
	connection.query(query, [id, nombre, precio], (err, rows, fields) => {
		if (!err) {
			res.json({ status: 'producto actualizado' });
		} else {
			console.log(err);
			res.json({ status: 'error al actualizar intente de nuevo' });
		}
	});
});

//Borrar un registro
router.delete('/producto/:id', (req, res) => {
	const { id } = req.params;
	connection.query('call eliminarProducto(?)', [id], (err, rows, fields) => {
		if (!err) {
			return res.json({ status: 'producto eliminado' });
		} else {
			console.log(err);
			return res.json({
				status: 'error al eliminar intente de nuevo',
			});
		}
	});
});

module.exports = router;
