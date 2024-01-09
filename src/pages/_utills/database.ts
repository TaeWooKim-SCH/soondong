import mysql from 'mysql';

const connectionInfo = {
  host: 'localhost',
  user: 'root',
  password: '0902',
  database: 'soondong'
};

export async function handleMysql(query: string) {
  const connection = mysql.createConnection(connectionInfo);
  let result;
  await connection.connect();

  connection.query(query, (error, data, fields) => {
    if (error) {
      console.error(error);
    }
    else {
      result = data;
    }
  })

  connection.end();
  return result;
}