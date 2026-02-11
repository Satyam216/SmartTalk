require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const testUploadRoute = require("./routes/testUpload");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.use("/api", testUploadRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
