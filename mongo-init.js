db.createUser({
	user: "dev_user",
	pwd: "dev_pass",
	roles: [
		{
			role: "readWrite",
			db: "development",
		},
	],
});

db = db.getSiblingDB("production");
db.createUser({
	user: "prod_user",
	pwd: "prod_pass",
	roles: [
		{
			role: "readWrite",
			db: "production",
		},
	],
});
