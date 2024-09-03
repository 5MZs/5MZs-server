const { Router } = require("express");
const controller = require("../cardbenefitsinfo/contoller");

const router = Router();

router.get("/", controller.getCardBenefitsInfo);
router.get("/:cardcompany", controller.getCardCompany);

module.exports = router;