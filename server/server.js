const express = require('express');
const mysql = require('mysql2');

//const apiRouter = require("./routes/index.js")
const pool = require("./db/index.js")
const app = express()
const port = 3000

app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/api/test', (req, res) =>{
  res.json({apiRouter})
})

app.get('/api/all', async (req, res) => {
  const query = "SELECT * FROM consomation";
  pool.query(query, (error, results) => {
    if(!results[0]){
      res.json({status : "not found"})
    }
    console.log({results})
    res.json({ results });
  })
  
})


app.get('/api/aulnay', async (req, res) => {
  const query = "SELECT * FROM consomation where promo like '%aulnay'";
  pool.query(query, (error, results) => {
    if(!results[0]){
      res.json({status : "not found"})
    }
    console.log({results})
    res.json({ results });
  })
  
})


//INSERT INTO `consomation` (`promo` ,`date`,`cost`) VALUES ('Simplon NAQ Bordeaux IA1', '08-04-2021',  '3.9376197');




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

