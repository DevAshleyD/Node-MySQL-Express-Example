const express = require('express');
const path = require('path');
const db = require('./models');
const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Routes
// =============================================================
require('./routes/api-routes.js')(app);

db.sequelize.sync({}).then(function () {
	app.listen(PORT, function () {
		console.log('App listening on PORT ' + PORT);
	});
});