require("dotenv").config();

const express = require("express");
const eventRoutes = require("./routes/eventRoutes");
const cors = require("cors");
console.log(process.env.MONGO_URI);
const connectDB = require("./db");
const badgeRoutes = require(
  "./routes/badgeRoutes"
);

const resultRoutes = require(
  "./routes/resultRoutes"
);

const registrationRoutes = require(
  "./routes/registrationRoutes"
);

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/events", eventRoutes);
app.use("/register", registrationRoutes);
app.use("/results", resultRoutes);
app.use("/badges", badgeRoutes);

app.get("/test", (req, res) => {
  res.send("Events API Ready");
});
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
