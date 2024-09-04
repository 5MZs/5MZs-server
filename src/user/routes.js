const { Router } = require("express");
const controller = require("../user/controller");

const router = Router();

router.get("/api/v1/users", controller.getUsers);
router.post("/join", controller.postJoin);
router.post("/login", controller.postLogin);

router.get('/protected', (req, res) => {
  // 요청 헤더에서 토큰 추출
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided.' });
  }

  // 토큰 검증 및 디코딩
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token.' });
    }

    // 성공적으로 토큰이 검증되면 user_id 추출
    const user_id = decoded.user_id;
    res.json({ user_id });
  });
});

module.exports = router;