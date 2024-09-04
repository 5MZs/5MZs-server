const { Router } = require("express");
const controller = require("../user/controller");

const router = Router();

router.get("/api/v1/users", controller.getUsers);
router.post("/join", controller.postJoin);
router.post("/login", controller.postLogin);

module.exports = router;