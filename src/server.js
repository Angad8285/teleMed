const express = require("express");
const app = express();
const mongoose = require("mongoose");
const telemedRoute = require("./routes/telemedRoute");

require("dotenv").config();

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.url, req.method, req.path);
  next();
});

app.use("/", telemedRoute);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server is running on port ${process.env.PORT || 4000}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
