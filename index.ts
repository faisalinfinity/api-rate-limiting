const express = require("express")
const mongoose = require("mongoose")
const app = express()
app.use(express.json())
const {limitRequests} =require("./middleware/limitRequest")
app.get('/api', limitRequests, (req:any, res:any) => {
    res.send('Hello, world!');
  });

app.listen(4000, async () => {

    await mongoose.connect("mongodb://127.0.0.1:27017/ratelimit?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0")
    console.log("running")


})