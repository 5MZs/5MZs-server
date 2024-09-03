const getUsers = "SELECT * FROM users";
const getCardBenefitsInfo = "SELECT * FROM card_benefits_info";
const getCardCompany = "SELECT * FROM card_benefits_info WHERE card_company_name = $1";

module.exports = {
  getUsers,
  getCardBenefitsInfo,
  getCardCompany,
}