require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectToDatabase = require("./database/database");
const userRoute = require("./users/users.route")
 
const port = process.env.PORT || 3001;
const app = express();

connectToDatabase();
app.use(cors());
app.use(express.json());

app.use('/users', userRoute);

app.listen(port, () => {
  `servidor rodando na porta: ${port}`;
});