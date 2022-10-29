const mysql = require('mysql');
const { MYSQL_CONFIG } = require('../../config/db');

const connection = mysql.createConnection(MYSQL_CONFIG);

connection.connect();

// 查询的话返回的是一个row数组，就是存储查询到的所有行
function execSQL(sql) {
  const promise = new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    })
  });
  return promise;
}

module.exports = {
  execSQL
}