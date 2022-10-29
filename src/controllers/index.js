const { execSQL } = require('../utils/db/mysql')

// 创建一个对象用于处理对应的sql查询
// 编写对象的方法：从接收的参数来处理字符串sql，执行查询
// 最后记得exports暴露对象并在routes/index.js中解构导入

const bloghandler = {
  getDetail: (id) => {
    return execSQL(`select * from blogs where id=${id}`);
  },
  insertData: (passage) => {
    const sql = `insert into blogs(title,author,context) values ('${passage.title}','${passage.author}','${passage.context}')`;
    return execSQL(sql);
  },
  getList:(author, keyword) => {
    const sql = `select * from blogs where 1=1 `;
    if (author) {
      sql += `and author ='${author} '`;
    }
    if (keyword) {
      sql += `and title like '%${keyword}%'`;
    }
    return execSQL(sql);
  }
}

module.exports = {
  bloghandler
}