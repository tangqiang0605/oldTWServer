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
  return execSQL(sql);
}

const insertData = (passage)=>{
  const sql = `insert into blogs(title,author,context) values ('${passage.title}','${passage.author}','${passage.context}')`;
  return execSQL(sql);
}

module.exports = {
  getList,
  getDetail,
  insertData
}