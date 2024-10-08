const { Router } = require("express");
const controller = require("../financialLedger/controller");

const router = Router();

router.get("/", controller.getFinancialLedger);
router.post("/", controller.postFinancialLedger);
router.post("/month", controller.postFinancialLedgerMonth);
module.exports = router;