const { execSQL } = require('../db/mysql')

const getList = (author, keyword) => {
  const sql = `select * from blogs where 1=1 `;

  if (author) {
    sql += `and author ='${author} '`;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%'`;
  }

  return execSQL(sql);
}

const getDetail = (id) => {
  const sql = 'select * from blogs';
  execSQL(sql).then(result => {
    console.log(result);
  })
  return execSQL(sql);
}

module.exports = {
  getList,
  getDetail
}