const pool = require('../../db');
const queries = require('../user/queries');
const bcrypt = require('bcrypt');

const getUsers = (req, res) => {
  pool.query(queries.getUsers, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const postJoin = async (req, res, next) => {
  const { user_id, password, phone_number, nick_name, cardno } = req.body;

  try {
    const result = await pool.query(queries.checkQuery, [user_id]);
    if (result.rows.length > 0) {
      return res.status(408).json({ error: "이미 있는 user_id 값입니다. 다시 입력해주세요." });
    }
    const insertResult = await pool.query(queries.insertQuery, [user_id, password, phone_number, nick_name, cardno]);
    res.status(201).json(insertResult.rows[0]);
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ error: '서버 오류. 나중에 다시 시도해 주세요.' });
  }
};

const postLogin = async (req, res,
  next) => {
  const { user_id, password } = req.body;

  try {
    const result = await pool.query(queries.checkQuery, [user_id]);
    if (result.rowCount === 0) {
      return res.status(401).json({ error: '사용자 ID 또는 비밀번호가 잘못되었습니다.' });
    }
    const match = bcrypt.compare(String(password), String(result.rows[0].password));
    console.log(result.rows[0].user_id);
    console.log(result.rows[0].password);
    console.log(password);
    console.log(match);
    if (match) {

      res.status(200).json({ message: '로그인 성공!' });
    } else {

      res.status(401).json({ error: '사용자 ID 또는 비밀번호가 잘못되었습니다.' });
    }
  } catch (error) {

    console.error('Error during login:', error);
    res.status(500).json({ error: '서버 오류. 나중에 다시 시도해 주세요.' });
  }
};

module.exports = {
  getUsers,
  postJoin,
  postLogin,
};