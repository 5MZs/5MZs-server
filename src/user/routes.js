const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getUsers);
router.get("/get/cardinfo", controller.getCardBenefitsInfo);
router.get("/get/cardcompany/:cardcompany", controller.getCardCompany);

module.exports = router;