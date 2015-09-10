var oracle =  require("oracle");

var connectData = {
    hostname: "tripster.cykd3tbnqzik.us-east-1.rds.amazonaws.com",
    port: 1521,
    database: "ORCL", // System ID (SID)
    user: "G28",
    password: "tripsterg28"
}

function query_db(req, res, username, tripid) {
	var sql = "INSERT INTO REQUEST VALUES ('" + username + "', '" + tripid + "', 'pending')";
	oracle.connect(connectData, function(err, connection) {
		if (err) {
			console.log(err);
		} else {
			connection.execute(sql, [], function(err) {
				if (err) {
					console.log(err);
				} else {
					connection.close();
					res.render('applytrip.jade', { 
						title: "Request sent."
					});
				}
			});
		}
	})
}

exports.do_work = function(req, res){
	var username = req.session.username;
	var tripid = req.query.tripid;
	// console.log(tripname);

	query_db(req, res, username, tripid);


}