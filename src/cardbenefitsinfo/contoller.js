const pool = require('../../db');
const queries = require('../cardbenefitsinfo/queries');

// 카드 혜택 정보 가져오기
const getCardBenefitsInfo = async (req, res) => {
  try {
    const result = await pool.query(queries.getCardBenefitsInfo);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching card benefits info:', error);
    res.status(500).json({ error: '서버 오류. 나중에 다시 시도해 주세요.' });
  }
};

// 카드 회사 정보 가져오기
const getCardCompany = async (req, res) => {
  const cardCompanyName = req.params.cardcompany;

  try {
    const result = await pool.query(queries.getCardCompany, [cardCompanyName]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching card company info:', error);
    res.status(500).json({ error: '서버 오류. 나중에 다시 시도해 주세요.' });
  }
};

module.exports = {
  getCardBenefitsInfo,
  getCardCompany
};