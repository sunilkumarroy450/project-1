const mongoose = require("mongoose");
const MONGODB_URL = `mongodb://project-1:project-1@ac-exyxdt0-shard-00-00.hbwzwnu.mongodb.net:27017,ac-exyxdt0-shard-00-01.hbwzwnu.mongodb.net:27017,ac-exyxdt0-shard-00-02.hbwzwnu.mongodb.net:27017/?ssl=true&replicaSet=atlas-qy2esn-shard-0&authSource=admin&retryWrites=true&w=majority`;

const connectDB = async () => {
  return mongoose.connect(MONGODB_URL, { useNewUrlParser: true });
};
module.exports = connectDB;
