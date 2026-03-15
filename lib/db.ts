import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Bisleri@30",
  database: "ndis_app",
});

export default db;
