const express = require("express");
const dbConnection = require("./config/db");
const Config = require("./config");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const path = require("path");

const app = express();

const PORT = Config.PORT || 7890;

// Middleware to parse incoming JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// dbConnection
dbConnection();

// api routes s
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err, "server is not Connected");
  }
  console.log(`listening on port : http://localhost:${PORT}`);
});
