
import dotenv from "dotenv"
dotenv.config({path: "./.env"})
import connectDB from "./db/index.js";
import { app } from "./app.js"

connectDB()
.then(()=> {
  app.listen(process.env.PORT || 3000 , ()=> {
    console.log("Server is running on port ", process.env.PORT);
  })
})
.catch((error)=> {
console.log("MONGO DB CONNECTION FAILED" , error);
})
























/*
import express from 'express'

const app = express()

;(async ()=> {
  try {
   await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
   app.on('error',(error)=> {
    console.log("ERROR: Couldn't connect to Mongo");
    throw error
   })

   app.listen(`${process.env.PORT}`,()=> {
    console.log(`App listening on ${process.env.PORT}`);
    
   })

  } catch (error) {
    console.error("ERROr", error)
  }
})()

*/