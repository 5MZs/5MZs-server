const getFinancialLedger = "SELECT * FROM financial_ledger";
const insertQuery = 'INSERT INTO financial_ledger (user_id, place_name, price, date, latitude, hardness) VALUES ($1, $2, $3, $4, $5, $6);'
const postFinancialLedgerMonth = "SELECT id, user_id, place_name, price, date, latitude, hardness FROM public.financial_ledger WHERE TO_CHAR(date, 'MM') = $1"


module.exports = {
  getFinancialLedger,
  insertQuery,
  postFinancialLedgerMonth,
}