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
  const month = parseFloat(date);
  console.log(month);
  try {
    const result = await pool.query(queries.postFinancialLedgerMonth , [month]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching card benefits info:', error);
    res.status(500).json({ error: '서버 오류. 나중에 다시 시도해 주세요.' });
  }
};

const postFinancialLedger = async (req, res) => {
  const { place_name, price, date, latitude, hardness, token } = req.body;
  try {
    // JWT 디코딩
    const decoded = jwt.decode(token, { complete: true });
    const user_id = decoded.payload.user_id;

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
  postFinancialLedger
};