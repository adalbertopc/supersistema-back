const express = require('express');
const app = express();
const cors = require('cors');
//settings
app.set('port', process.env.PORT || 3500);
app.use(cors());

//middlewares
app.use(express.json());

//routes
app.use(require('./routes/producto'));
app.use(require('./routes/auditoria'));
app.use(require('./routes/usuario'));
app.use(require('./routes/auth'));

//iniciar servidor
app.listen(app.get('port'), () => {
	console.log('server listo', app.get('port'));
});
