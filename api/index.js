const server = require("./src/app.js");
const { conn } = require("./src/db.js");
require('dotenv').config();
const port = process.env.port || 3001;


// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
	server.listen(port, () => {
		console.log(`Server listening on port ${port}`); // eslint-disable-line no-console
	});
});