const express = require('express');
const router = express.Router();

const connection = require('../database');

//LEER TODOS LOS DE LA TABLA
//req request
router.get('/producto', (req, res) => {
	//esta consulta si es exitosa retorna rows, si da error pues err xd
	connection.query('select * from producto;', (err, rows, fields) => {
		if (!err) {
			res.json(rows);
		} else {
			console.log(err);
		}
	});
});
//LEER POR ID ESPECIFICO
router.get('/producto/:id', (req, res) => {
	//para obtener el id de la url
	const { id } = req.params;
	//primero la query despues en un arreglo[id] los parametros de los signos ? y
	//despues igualmente ya retornar la respuesta json
	connection.query(
		'select * from producto where idProducto = ?;',
		[id],
		(err, rows, fields) => {
			if (!err) {
				//como solo va a retornar 1 pues agarramos pa posicion 0
				res.json(rows[0]);
			} else {
				console.log(err);
			}
		}
	);
});

//AGREGAR UN NUEVO REGISTRO A LA TABLA
router.post('/producto', (req, res) => {
	const { idUsuario, nombre, precio } = req.body;
	//llamamos a nuestro procedimiento almacenado
	const query = `call agregarProducto(?,?,?);`;

	connection.query(
		query,
		[idUsuario, nombre, precio],
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
	const query = `call actualizarProducto(?,?,?,?);`;
	connection.query(
		query,
		[idUsuario, id, nombre, precio],
		(err, rows, fields) => {
			if (!err) {
				res.json({ status: 'producto actualizado' });
			} else {
				console.log(err);
				res.json({
					status: 'error al actualizar intente de nuevo',
				});
			}
		}
	);
});

//Borrar un registro
router.delete('/producto/:id', (req, res) => {
	const { id } = req.params;
	connection.query(
		'call eliminarProducto(?,?)',
		[idUsuario, id],
		(err, rows, fields) => {
			if (!err) {
				return res.json({ status: 'producto eliminado' });
			} else {
				console.log(err);
				return res.json({
					status: 'error al eliminar intente de nuevo',
				});
			}
		}
	);
});

module.exports = router;
