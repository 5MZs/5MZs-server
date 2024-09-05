const pool = require('../../db');
const queries = require('../user/queries');
const config = require("../../config");
const jwt = require('jsonwebtoken');

// 사용자 리스트 가져오기
const getUsers = (req, res) => {
  pool.query(queries.getUsers, (error, results) => {
    if (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ error: '서버 오류. 나중에 다시 시도해 주세요.' });
    }
    res.status(200).json(results.rows);
  });
};

// 회원가입 처리
const postJoin = async (req, res, next) => {
  const { user_id, password, phone_number, nick_name, cardno } = req.body;

  try {
    const result = await pool.query(queries.checkQuery, [user_id]);

    // 이미 존재하는 사용자 체크
    if (result.rows.length > 0) {
      return res.status(408).json({ error: "이미 있는 user_id 값입니다. 다시 입력해주세요." });
    }

    // 사용자 추가
    const insertResult = await pool.query(queries.insertQuery, [user_id, password, phone_number, nick_name, cardno]);
    res.status(201).json({ message: '회원가입이 성공적으로 완료되었습니다.' });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ error: '서버 오류. 나중에 다시 시도해 주세요.' });
  }
};

// 로그인 처리
const postLogin = async (req, res) => {
  const { user_id, password } = req.body;

  try {
    // 데이터베이스에서 사용자 검증
    const result = await pool.query(queries.checkQuery, [user_id]);

    // 사용자 ID 존재 여부 확인
    if (result.rowCount === 0) {
      return res.status(401).json({ error: '사용자 ID 또는 비밀번호가 잘못되었습니다.' });
    }

    // 비밀번호 비교
    const storedPassword = String(result.rows[0].password).trim();
    const inputPassword = String(password).trim();

    if (inputPassword === storedPassword) {
      // JWT 생성
      const token = jwt.sign({ user_id: user_id }, config.token.SECRET_KEY, { expiresIn: '1h' });
      
      return res.status(200).json({ message: '로그인 성공!', token});
    } else {
      return res.status(401).json({ error: '사용자 ID 또는 비밀번호가 잘못되었습니다.' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: '서버 오류. 나중에 다시 시도해 주세요.' });
  }
};


module.exports = {
  getUsers,
  postJoin,
  postLogin,
};