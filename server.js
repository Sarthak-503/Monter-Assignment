const app =require("./app");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

dotenv.config({path:"config/config.env"});

// Middleware
app.use(bodyParser.json());

// Connect to Database (MongoDB)
connectDatabase();
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>{
  console.log(`Server started on port http://localhost:${PORT}`);

});

process.on("unhandledRejection", err => {
  console.log(`Error :${err.message}`);
  console.log(`Shutting down the server due to  unhandled Promise Rejction`);

  server.close(()=>{
      process.exit(1);
  })
})