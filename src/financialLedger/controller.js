const pool = require('../../db');
const queries = require('..//financialLedger/queries');
const jwt = require('jsonwebtoken');

const getFinancialLedger = async (req, res) => {
  try {
    const result = await pool.query(queries.getFinancialLedger);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching card benefits info:', error);
    res.status(500).json({ error: '서버 오류. 나중에 다시 시도해 주세요.' });
  }
};
// month 별로 조회 하기 to_Char 이용해야 할 것 처럼 보임
const postFinancialLedgerMonth = async (req, res) => {
  const { date } = req.body;
  // date에서 월 추출 (예: '20240904'에서 '09' 추출)
  const month = date.substring(5, 7);
  console.log('Extracted Month:', month);

  try {
    // 특정 월의 데이터를 가져오는 쿼리
    const result = await pool.query(queries.postFinancialLedgerMonth, [month]);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching financial ledger data:', error);
    res.status(500).json({ error: '서버 오류. 나중에 다시 시도해 주세요.' });
  }
};

const postFinancialLedger = async (req, res) => {
  const { place_name, price, date, latitude, hardness, token } = req.body;
  try {
    // JWT 디코딩
    const decoded = jwt.decode(token, { complete: true });
    const user_id = decoded.payload.user_id;

    // 디코딩된 JWT가 null일 경우 처리
    if (!decoded || !decoded.payload) {
      return res.status(400).json({ error: '유효하지 않은 토큰입니다.' });
    }

    // id는 자동 증가 되므로 생략
    await pool.query(queries.insertQuery, [user_id, place_name, price, date, latitude, hardness]);

    res.status(201).json({ message: '성공적으로 입력이 되었습니다.' });
  } catch (error) {
    if (error.code === '23505') {  // Unique violation
      return res.status(409).json({ error: '중복된 ID가 존재합니다.' });
    }
    console.error('Error during ledger entry:', error);
    res.status(500).json({ error: '서버 오류. 나중에 다시 시도해 주세요.' });
  }
};

module.exports = {
  getFinancialLedger,
  postFinancialLedger,
  postFinancialLedgerMonth
};