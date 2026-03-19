const express = require("express");

const app = express();

const Port = 3000;

app.use(express.json());

const users = [];

app.post("/signup", (req, res) => {
  const user = req.body;

  const userAlredyExits = false;

  for (let i = 0; i < users.length; i++) {
    if (users[i].email === user.email) {
      userAlredyExits = true;
      break;
    }
  }

  if (userAlredyExits) {
    res.status(400).send("user already exits");
  } else {
    users.push(user);
    res.status(200).send("signup succesfully");
  }
});

app.post("/login", (req, res) => {
  const user = req.body;

  const userFound = null;

  for (var i = 0; i < users.length; i++) {
    if (users[i].email === user.email && users[i].password === user.password) {
      userFound = users[i];
      break;
    }
  }

  if (userFound) {
    res.json({
      firstName: userFound.firstName,
      lastName: userFound.lastName,
      email: userFound.email,
    });
  } else {
    res.status(400);
  }
});

app.post("/data", (req, res) => {
  var email = req.headers.email;
  var password = req.headers.password;

  let userFound = false;

  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email && users[i].password === password) {
      userFound = true;
    }
  }

  if (userFound) {
    const userToReturn = users.map((user) => ({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }));
    res.json({
      users: userToReturn,
    });
  } else {
    res.sendStatus(400);
  }
});
