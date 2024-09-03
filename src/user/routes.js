const { Router } = require("express");
const controller = require("../user/controller");

const router = Router();

router.get("/api/v1/users", controller.getUsers);
router.post("/login", controller.postUsers);

module.exports = router;