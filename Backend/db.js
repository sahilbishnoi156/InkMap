const mongoose = require("mongoose"); //~ Initializing mongoose
require('dotenv').config();
const mongoURI = process.env.DATABASE //~ Can't use local host because node js supports ipv6 address



const connectToMongo= async()=>{
    await mongoose.connect(mongoURI);
    console.log("Connected to mongo");
}
module.exports = connectToMongo;