const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/search/:tag", controller.getMapTag);

module.exports = router;