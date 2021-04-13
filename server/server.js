const express = require('express');
const mysql = require('mysql2');
const cors = require('cors')
//const apiRouter = require("./routes/index.js")
const pool = require("./db/index.js")
const app = express()
const port = process.env.PORT || 4000;

app.use(express.json())
app.use(cors())


app.get("/", (req, res) => {
  res.send('Api Simplon Azure Managment Cost')
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


//Nancy, Stasbourg, nantes, bordeaux, nouvelle-aquitaine, castelnau, marseille, aulnay

app.get('/api/promo/:city', async (req, res) => {
  const {city} = req.params;
  const query = `SELECT * FROM consomation where promo like '%${city}%' order by date DESC`;
  pool.query(query, (error, results) => {
    if(!results[0]){
      res.json({status : "not found"})
    }
    console.log({results})
    res.json({ results });
  })
})

app.get('/api/rennes_ia', async (req, res) => {
  const query = "SELECT * FROM consomation where promo = 'Simplon GDO Rennes IA1' order by date DESC";
  pool.query(query, (error, results) => {
    if(!results[0]){
      res.json({status : "not found"})
    }
    console.log({results})
    res.json({ results });
  })
  
})

app.get('/api/rennes', async (req, res) => {
  const query = "SELECT * FROM consomation where promo = 'Simplon Rennes' order by date DESC";
  pool.query(query, (error, results) => {
    if(!results[0]){
      res.json({status : "not found"})
    }
    console.log({results})
    res.json({ results });
  })
  
})


app.get('/api/dailyConso', async (req, res) => {
  const query = "SELECT SUM(cost) AS totalDailyCost, date FROM consomation GROUP BY date";
  pool.query(query, (error, results) => {
    if(!results[0]){
      res.json({status : "not found"})
    }
    console.log({results})
    res.json({ results });
  })
})


app.get('/api/serviceConso', async (req, res) => {
  const query = "SELECT SUM(cost) AS totalServiceCost, service FROM consomation GROUP BY service";
  pool.query(query, (error, results) => {
    if(!results[0]){
      res.json({status : "not found"})
    }
    console.log({results})
    res.json({ results });
  })
})


app.get('/api/conso/promo', async (req, res) => {
  const query = "SELECT promo, Sum(cost) as promoTotalCost FROM consomation GROUP BY promo";
  pool.query(query, (error, results) => {
    if(!results[0]){
      res.json({status : "not found"})
    }
    console.log({results})
    res.json({ results });
  })
})


// app.get('/api/conso/:promo', async (req, res) => {
//   const {promo} = req.params;
//   const query = `SELECT promo, (select SUM(cost) from consomation) AS total FROM consomation where promo like '%${promo}%'`;
//   pool.query(query, (error, results) => {
//     if(!results[0]){
//       res.json({status : "not found"})
//     }
//     console.log({results})
//     res.json({ results });
//   })
// })




app.get('/api/endpoints', (req, res) =>{
  res.send(['http://localhost:3001/api/promo/aulnay', 'http://localhost:3001/api/rennes', 'http://localhost:3001/api/promo/marseille', 'http://localhost:3001/api/promo/castelnau', 
'http://localhost:3001/api/promo/nouvelle-aquitaine', 'http://localhost:3001/api/promo/bordeaux', 'http://localhost:3001/api/rennes_ia', 'http://localhost:3001/api/promo/nantes', 'http://localhost:3001/api/promo/strasbourg', 'http://localhost:3001/api/all', 'http://localhost:3001/api/promo/nancy'])
})


//INSERT INTO `consomation` (`promo` ,`date`,`cost`) VALUES ('Simplon NAQ Bordeaux IA1', '08-04-2021',  '3.9376197');


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

