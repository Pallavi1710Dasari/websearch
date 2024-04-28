
// backend/server.js
const express = require('express')
const database = require('./dbConfig.cjs')
const readFiles = require('./filereader.cjs')


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})
//to read local files data into mongo db. run only once to insert into mongo db.
//readFiles();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});





