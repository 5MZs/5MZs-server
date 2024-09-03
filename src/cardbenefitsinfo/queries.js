const getCardBenefitsInfo = "SELECT * FROM card_benefits_info";
const getCardCompany = "SELECT * FROM card_benefits_info WHERE card_ccmpany_name = $1";

module.exports = {
  getCardBenefitsInfo,
  getCardCompany,
}