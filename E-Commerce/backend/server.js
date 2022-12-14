const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const connectDataBase = require("./config/dataBase");

// Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to uncaught exception`);
    process.exit(1)
});

// Config
dotenv.config({path:"backend/config/config.env"});

// Database Connection

connectDataBase();

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
});


const server =  app.listen(process.env.PORT, ()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`)
})

// Unhandled Promise Rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);
    
    server.close(()=>{
        process.exit(1);
    });
});
