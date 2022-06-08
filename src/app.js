const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
require("./connection/conn");

//importing routes -----------------------------------------------
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const foodRoutes = require("./routes/food");
const cartRoutes = require("./routes/cart");
const wishlistRoutes = require("./routes/wishlist");
const reviewsRoutes = require("./routes/reviews");
const mediaRoutes = require("./routes/media");

app.use(adminRoutes);
app.use(userRoutes);
app.use(foodRoutes);
app.use(cartRoutes);
app.use(wishlistRoutes);
app.use(reviewsRoutes);
app.use(mediaRoutes);

const PORT = 3500;
app.listen(PORT, () => {
  console.log("Listening to port " + PORT);
});
