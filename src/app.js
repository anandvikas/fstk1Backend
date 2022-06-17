require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
require("./connection/conn");

const path = require("path");
// app.use("/uploads/images", express.static(path.join("uploads", "images")));

//importing routes -----------------------------------------------
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const foodRoutes = require("./routes/food");
const cartRoutes = require("./routes/cart");
const wishlistRoutes = require("./routes/wishlist");
const reviewsRoutes = require("./routes/reviews");
const nlsRoutes = require("./routes/newsletterSubscribers")
const mediaRoutes = require("./routes/media");
const testRoutes = require("./routes/test");

app.use(adminRoutes);
app.use(userRoutes);
app.use(foodRoutes);
app.use(cartRoutes);
app.use(wishlistRoutes);
app.use(reviewsRoutes);
app.use(mediaRoutes);
app.use(testRoutes);
app.use(nlsRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Listening to port " + PORT);
});
