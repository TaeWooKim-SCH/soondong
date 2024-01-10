import mysql, { Connection } from 'mysql2';

let db: Connection;

const connectionInfo = {
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT) || 3306,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
};

try {
  db = mysql.createConnection(connectionInfo);
}
catch (err) {
  console.error(err);
}

export { db };
