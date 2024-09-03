const pool = require('../../db');
const queries = require('./queries');

const getUsers = (req, res) => {
  pool.query(queries.getUsers, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getCardBenefitsInfo = (req, res) => {
  pool.query(queries.getCardBenefitsInfo, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getCardCompany = (req, res) => {
  const cardCompanyName = req.params.cardcompany;
  pool.query(queries.getCardCompany, [cardCompanyName], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

module.exports = {
  getUsers,
  getCardBenefitsInfo,
  getCardCompany,
};