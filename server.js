const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

// process.on("uncaughtException",(err)=>{
//   console.log(`Error: ${err.message}`);
//   console.log(`Shutting down the server due to Uncaught Exception`);
//   process.exit(1);
// })

dotenv.config({path:"config/config.env"});

// Connect to Database (MongoDB)
connectDatabase();

const server = app.listen(process.env.PORT, () =>{
  console.log(`Server started on port http://localhost:${process.env.PORT}`);

});

process.on("unhandledRejection", err => {
  console.log(`Error :${err.message}`);
  console.log(`Shutting down the server due to  unhandled Promise Rejction`);

  server.close(()=>{
      process.exit(1);
  })
})