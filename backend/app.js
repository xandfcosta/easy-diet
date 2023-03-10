const express = require("express");
const cors = require("cors");
var mysql = require("mysql2");

const app = express();
app.use(cors());

app.get("/search_meal/:meal_name", (req, res) => {
  let meal_name = req.params.meal_name;
  meal_name.replace(" ", "%");

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "easy_diet",
  });

  con.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
  });

  con.query(
    `SELECT * FROM meals WHERE name like '${meal_name}%'`,
    (err, result, fields) => {
      if (err) throw err;
      console.log(`Selected meals like ${meal_name}`);
      res.json(result);
    }
  );
});

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
});
