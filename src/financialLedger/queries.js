const getFinancialLedger = "SELECT * FROM financial_ledger";
 const insertQuery = 'INSERT INTO financial_ledger (user_id, place_name, price, date, latitude, hardness) VALUES ($1, $2, $3, $4, $5, $6);'

module.exports = {
  getFinancialLedger,
  insertQuery,
}