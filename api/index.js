const server = require("./src/app.js");
const { conn } = require("./src/db.js");
require('dotenv').config();
const PORT = process.env.PORT || 3001;


// Syncing all the models at once.
conn.sync({ force: false }).then(async () => {
	server.listen(PORT, () => {
		console.log(`Server listening on port ${PORT}`); // eslint-disable-line no-console
	});
});