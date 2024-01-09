import mysql, { Connection } from 'mysql';

let db: Connection;

const connectionInfo = {
  host: 'localhost',
  user: 'root',
  password: '0902',
  database: 'soondong'
};

try {
  db = mysql.createConnection(connectionInfo);
}
catch (err) {
  console.error(err);
}

export { db };
