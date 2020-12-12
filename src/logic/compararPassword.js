const compararPassword = async (passwordDB, password) => {
	console.log(passwordDB, password);
	return passwordDB === password ? true : false;
};

module.exports = compararPassword;
