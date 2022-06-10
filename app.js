const express = require("express");

const app = express();

app.listen(3000);

app.get("/", (req, res) => {
  res.sendFile("./Pages/welcome.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  res.sendFile("./Pages/About.html", { root: __dirname });
});

app.get("/contact", (req, res) => {
  res.sendFile("./Pages/contact.html", { root: __dirname });
});

app.get("/welcome", (req, res) => {
  res.redirect("/");
});

app.get("/login", (req, res) => {
  let userName = req.query.uname;
  let password = req.query.password;

  if (userName === "" || password === "") {
    res.sendFile("./Pages/FilenotFound.html", { root: __dirname });
  } else {
    res.sendFile("./Pages/welcome.html", { root: __dirname });
  }
});

app.use((req, res) => {
  res.sendFile("./Pages/FilenotFound.html", { root: __dirname });
});
