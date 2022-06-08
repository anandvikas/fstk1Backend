const mongoose = require("mongoose");

const path = process.env.DB_PATH;
mongoose
  .connect(path, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });
