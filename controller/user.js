// const mysql = require('mysql');
// const db_config = require('../config/db-config.json');

// const connection = mysql.createConnection( {
//     host        : db_config.host,
//     user        : db_config.user,
//     password    : db_config.password,
//     datebase    : db_config.datebase
// });
// connection.connect();

exports.createUser = (req, res) => {
    res.send("유저가 생성되었습니다.")
    console.log(req.query)
    console.log(res)
}

exports.readUser = (req, res) => {
    res.send("유저가 확인되었습니다.")
}

exports.updateUser = (req, res) => {
    res.send("유저가 갱신되었습니다.")
}

exports.deleteUser = (req, res) => {
    res.send("유저가 삭제되었습니다.")
}

// connection.end();