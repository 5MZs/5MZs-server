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

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/cardbenefitsinfo", cardBenefitsInfo);
app.use("/api/v1/map",mapInfo)

app.listen(port, () => console.log(`app listening on port ${port}`));
