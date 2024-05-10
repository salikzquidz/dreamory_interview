const express = require("express");
const { default: mongoose } = require("mongoose");
const appConf = require("./configs/app.conf");
const dbConf = require("./configs/db.conf");

const PORT = process.env.PORT || 3001;
let app = express();
app = appConf(app);

mongoose
  .connect(dbConf.dbURI)
  .then(() => {
    console.log("Database connection is established");
    app.listen(PORT, () => {
      console.log(`listening to port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
