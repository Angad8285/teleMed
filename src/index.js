const express = require("express");
// require('dotenv').config({ path: '../config/.env' });
require('dotenv').config();
console.log(process.env.PORT)
require('./db/mongoose')
const userRouter = require("./routers/user")
const doctorRouter = require("./routers/doctor")
const medicineRouter = require("./routers/medicine")

const app = express();
const port= process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
})

app.use(userRouter)
app.use(doctorRouter)
app.use(medicineRouter)

app.listen(port,()=>{
  console.log('Server is up on port '+ port)
})