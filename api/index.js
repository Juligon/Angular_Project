const server = require("./src/app.js");
const { conn } = require("./src/db.js");
require('dotenv').config();
const { PORT } = process.env || 3001;

// Syncing all the models at once.
conn.sync({ force: false }).then(async () => {
	server.listen(PORT, () => {
		console.log(`App is listening in port ${PORT}`); // eslint-disable-line no-console
	});
});