require('./db/mongoose')
const express = require("express");
const telemedRoute = require("./routes/telemedRoute");
const port= process.env.PORT || 3000

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.url, req.method, req.path);
  next();
});

app.use("/", telemedRoute);

app.listen(port,()=>{
  console.log('Server is up on port '+ port)
})