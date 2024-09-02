const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getUsers);
router.get("/get/cardinfo", controller.getCardBenefitsInfo);

module.exports = router;