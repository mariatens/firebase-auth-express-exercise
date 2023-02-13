process.env.GOOGLE_APPLICATION_CREDENTIALS =
"secrets/secret.json";

const express = require("express");
const { getAncientWisdom } = require("./bookOfAncientWisdom");

const { initializeApp } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const cors = require("cors");

const app = express();
app.use(cors());

initializeApp()
const port = process.env.PORT || 4000;

//This route stays public for all
app.get("/", (req, res) => {
  res.send("Time (not secret): " + new Date());
});

//TODO: Your task will be to secure this route to prevent access by those who are not, at least, logged in.
app.get("/wisdom", (req, res) => {
  const idToken = req.header.splice(7)
  const handleVerify=  async() => {
    try{
      const decodedToken = await getAuth().verifyIdToken(idToken) 
      const uid = decodedToken.uid
      next()
    }
    catch (err) {
      res.status(401).send("Token did not verify.");
    }
  
  }

  //Eventual plan:
  //1. authHeader = get the value of the Authorization header
  //2. potentialToken = strip the "Bearer " prefix from authHeader
  //3. if (potentialToken is verified legit)
  //4.     return protected info in response
  //5. else
  //       say access denied in response
  res.send("🤐: " + getAncientWisdom() + "🤫");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
