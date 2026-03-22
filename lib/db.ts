import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Bisleri@30",
  database: "ndis_app",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
