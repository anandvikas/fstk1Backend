const mongoose = require("mongoose");

const path = `mongodb+srv://rakesh:System123@mtable.vbf4o.mongodb.net/vikasTable?retryWrites=true&w=majority`;
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
