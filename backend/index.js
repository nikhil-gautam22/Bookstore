import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bookRoute from './Routes/book.route.js'
import userRoute from './Routes/user.route.js'
import cors from 'cors'
import path from 'path';

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json())

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

//connect to mongodb
mongoose.connect(MONGODB_URI)
  .then(console.log("mongodb connected successfully...."))
  .catch(err =>console.log(err));

//definig routes
app.use("/book",bookRoute);
app.use("/user",userRoute)

 //deployment
if(process.env.NODE_ENV==="production"){
  const dirPath=path.resolve();
  app.use(express.static("frontend/dist"));
  app.get("*",(req,res) =>{
    res.sendFile(path.resolve(dirPath,"frontend","dist","index.html"));
  })
}

app.listen(PORT,()=>{console.log(`listening on ${PORT}`)})

