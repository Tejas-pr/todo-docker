import express from "express";
import { prismaClient } from "db/client";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "im running" });
})

app.get("/users", (req, res) => {
  prismaClient.user.findMany()
    .then(users => {
      res.json({users});
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
})

app.post("/user", (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return
  }

  prismaClient.user.create({
    data: {
      username,
      password
    }
  })
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
})

app.listen(8080, () => {
  console.log("Listening on port 8080");
});