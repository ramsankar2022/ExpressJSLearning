const express = require("express");
const cors = require("cors");
const app = express();
const jsencrypt = require("node-jsencrypt");
const fs = require("fs");

const privateKey = fs.readFileSync("./private.pem").toString("utf8");
const jsenc = new jsencrypt();
jsenc.setPrivateKey(privateKey);

app.use(cors());
app.set("view engine", "ejs");
app.set("views", "Pages");

app.listen(5000);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("css"));

app.get("/", (req, res) => {
  res.render("welcome");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/welcome", (req, res) => {
  res.redirect("/");
});

app.get("/signin", (req, res) => {
  res.render("signin");
});

app.post("/signin", (req, res) => {
  let userName = req.body.username;
  let password = req.body.password;

  if (userName == "test@gmail.com" || password == "password") {
    res.redirect("Welcome");
  } else {
    res.redirect("FileNotFound");
  }
});

// app.get("/login", (req, res) => {
//   let userName = req.query.uname;
//   let password = req.query.password;

//   if (userName === "" || password === "") {
//     res.render("FilenotFound");
//   } else {
//     res.render("welcome");
//   }
// });

app.post("/signinuser", (req, res) => {

  console.log(req.body.credentials);
  const eId = "test@gmail.com";
  const pwd = "password";
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  var credentials = JSON.parse(jsenc.decrypt(req.body.credentials));

  if (!("email" in credentials)) {
    res.json({ status: false, message: "email is required" });
    return;
  }

  if (!("password" in credentials)) {
    res.json({ status: false, message: "password is required" });
    return;
  }

  var email = credentials.email.trim();
  var password = credentials.password.trim();

  if (password == "") {
    res.json({ status: false, message: "password is required" });
    return;
  }

  if (email === eId && pwd === password) {
    res.json({
      status: true,
      message: "login successful",
      token: Math.random().toString().substr(2, 8),
    });
    return;
  }

  res.json({ status: false, message: "user not found" });
});

app.use((req, res) => {
  res.render("FilenotFound");
});

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
