const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
	const authHeader = req.get('Authorization');

	if (!authHeader) {
		return res.status(401).json({
			mensaje: 'Necesitas un token',
		});
	}

	const token = authHeader.split(' ')[1];

	jwt.verify(token, 'keySecreta', (err, decoded) => {
		if (err) {
			return res.status(401).json({
				mensaje: 'El token no es valido',
			});
		}

		req.user = decoded;
		return next();
	});
};

module.exports = auth;
