const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException',err =>{
  console.log('uncaught Exception! Shutting down....');
  console.log(err.name,err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

//const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
mongoose.connect(process.env.ATLAS, {
  useNewUrlParser:true,
  useUnifiedTopology: true,
  useCreateIndex:true,
}).then(() =>{
  console.log('DB connected');
});


const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}....`);
});

process.on('unhandledRejection',err =>{
  console.log('unhandler rejection! Shutting down....');
  console.log(err.name,err.message);
  server.close(() =>{
    process.exit(1);
  });
});
