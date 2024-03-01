
const express = require("express");
const router = express.Router();

const fs=require('fs');

router.get("/", (req, res, next) => {
  res.send(
    "<form action='/login/submit' method='POST'><label>Enter Username:</label><input type='text' name='userName'><button type='submit'>Submit</button></form>"
  );
});

router.post("/submit", (req, res, next) => {
  const { userName } = req.body;
  if (!userName) {
    res.status(400).send("Username is required");
    return;
  }
  res.cookie("userName", userName);
  res.redirect("/login/chat");
});

router.get("/chat", (req, res, next) => {
  const userName = req.cookies.userName;
  if (!userName) {
    res.redirect("/login");
    return;
  }

  fs.readFile('messages.txt','utf8',(err,data)=>{
         if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }
        const messages = data.split('\n').filter(Boolean); // Split messages by newline and remove empty lines
        res.send(`<h1>Welcome to the Chat, ${userName}!</h1>
                  <form action='/login/sendMessage' method='POST'>
                      <input type='text' name='message' placeholder='Enter your message...'>
                      <button type='submit'>Send</button>
                  </form>
                  <h2>Chat Messages:</h2>
                  <ul>${messages.map(message => `<li>${message}</li>`).join('')}</ul>`); // Render chat messages
    });
  });
  


router.post("/sendMessage", (req, res, next) => {
  const userName = req.cookies.userName;
  const message = req.body.message;
  if (!userName || !message) {
    res.status(400).send("Username and message are required");
    return;
  }
  // Append message to text file
  const fs = require("fs");
  fs.appendFile("messages.txt", `${userName}: ${message}\n`, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.redirect("/login/chat");
  });
});

module.exports = router;

