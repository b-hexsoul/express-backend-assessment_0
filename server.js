const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

//Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//API Router
const apiRoutes = require("./routes/API/apiRoutes");
app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
