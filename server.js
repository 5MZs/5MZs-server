const express = require("express");
const userRoutes = require("./src/user/routes");
const cardBenefitsInfo = require("./src/cardbenefitsinfo/routes");
const mapInfo = require("./src/mapInfo/routes");

const app = express();
const port = 3000;

const cors = require("cors");
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// 오류 처리 미들웨어
app.use((err, req, res, next) => {
  // 서버 로그 등 추가 가능
  console.error(err.stack);

  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

app.use("/", userRoutes);
app.use("/api/v1/cardbenefitsinfo", cardBenefitsInfo);
app.use("/api/v1/map", mapInfo);

app.listen(port, () => console.log(`app listening on port ${port}`));
