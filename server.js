const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "views");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "school",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySql Connected...");

  // untuk get data
  app.get("/", (req, res) => {
    const sql = "SELECT * FROM user";
    db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      const users = JSON.parse(JSON.stringify(result));
      res.render("index", { users: users, title: "Users" });
    });
  });

  // untuk post data
  app.post("/tambah", (req, res) => {
    const { nama, kelas } = req.body;
    const sql = `INSERT INTO user (nama, kelas) VALUES ('${nama}', '${kelas}')`;
    db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.redirect("/");
    });
  });
});

app.listen(8000, () => {
  console.log("Server started on port 3000");
});
