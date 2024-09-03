const pool = require('../../db');
const queries = require('../user/queries');

const getUsers = (req, res) => {
  pool.query(queries.getUsers, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const postUsers = async (req, res, next) => {
  const { user_id, password, phone_number, nick_name, cardno } = req.body;
  let result = await pool.query(queries.getUsersUserId);
  let data = result.rows;
  console.log(data);
  pool.query(queries.postUsers, [user_id, password, phone_number, nick_name, cardno], (error, results) => {
    if (error) {
      res.status(408).json("이미 있는 user_id 값 입니다. 다시 입력해주세요.");
    } 
    res.status(200).json(results.rows);
  })};

module.exports = {
  getUsers,
  postUsers,
};