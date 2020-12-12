module.exports = {
	JWT: {
		KEY: process.env.JWT_KEY || 'eduJotoHAHA',
		EXPIRA: process.env.JWT_EXPIRE || '48h',
	},
};
