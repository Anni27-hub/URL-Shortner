const express = require("express");
const { connectToMongoDB } = require('./connect')
const urlRoute = require('./routes/url')
const URL = require('./models/url');

const app = express();
const PORT = 8001;

connectToMongoDB('mongodb+srv://Anish:URL@url.8me6ihe.mongodb.net/?appName=URL')
.then (()=> console.log("MongoDB connected"))

app.use(express.json())
app.use("/url" , urlRoute)

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      {
        shortId : shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
    res.redirect(entry.redirectURL);
 });

app.listen(PORT , ()=> console.log(`Server started at port : ${PORT}`))