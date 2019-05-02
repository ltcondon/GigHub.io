const db = require("../backend/models");

module.exports = function(app) {
	app.post("/api/users", (request, response) => {
		db.User.create(request.body)
	})
}
