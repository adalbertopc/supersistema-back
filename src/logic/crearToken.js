const jwt = require('jsonwebtoken');
const config = require('../config');

const crearToken = (usuario) => {
	return jwt.sign(
		{
			id: usuario.idUsuario,
			email: usuario.emailUsuario,
		},
		config.JWT.KEY,
		{
			expiresIn: config.JWT.EXPIRA,
		}
	);
};

module.exports = crearToken;
