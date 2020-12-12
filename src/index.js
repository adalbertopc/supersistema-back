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

//iniciar servidor
app.listen(app.get('port'), () => {
	console.log('server listo', app.get('port'));
});
