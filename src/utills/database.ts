import mysql from 'mysql2';
import type { Connection, Pool } from "mysql2";

let db: Pool;

const connectionInfo = {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
};

try {
  db = mysql.createPool(connectionInfo);
}
catch (err) {
  console.error(err);
}
export { db };


