
import dotenv from "dotenv"
dotenv.config({path: "./.env"})
import connectDB from "./db/index.js";

connectDB()
























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