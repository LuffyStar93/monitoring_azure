const express = require('express');
const mysql = require('mysql2');
const cors = require('cors')
//const apiRouter = require("./routes/index.js")
const pool = require("./db/index.js")
const app = express()
const port = process.env.PORT || 3001;

app.use(express.json())
app.use(cors())


app.get("/", (req, res) => {
  res.send('Hello word')
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

app.get('/api/nancy', async (req, res) => {
  const query = "SELECT * FROM consomation where promo like '%nancy%' order by date DESC";
  pool.query(query, (error, results) => {
    if(!results[0]){
      res.json({status : "not found"})
    }
    console.log({results})
    res.json({ results });
  })
  
})

app.get('/api/strasbourg', async (req, res) => {
  const query = "SELECT * FROM consomation where promo like '%strasbourg%' order by date DESC";
  pool.query(query, (error, results) => {
    if(!results[0]){
      res.json({status : "not found"})
    }
    console.log({results})
    res.json({ results });
  })
  
})

app.get('/api/nantes', async (req, res) => {
  const query = "SELECT * FROM consomation where promo like '%nantes%' order by date DESC";
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


app.get('/api/bordeaux', async (req, res) => {
  const query = "SELECT * FROM consomation where promo like '%bordeaux%' order by date DESC";
  pool.query(query, (error, results) => {
    if(!results[0]){
      res.json({status : "not found"})
    }
    console.log({results})
    res.json({ results });
  })
  
})

app.get('/api/nouvelle-aquitaine', async (req, res) => {
  const query = "SELECT * FROM consomation where promo like '%nouvelle-aquitaine%' order by date DESC";
  pool.query(query, (error, results) => {
    if(!results[0]){
      res.json({status : "not found"})
    }
    console.log({results})
    res.json({ results });
  })
  
})

app.get('/api/castelnau', async (req, res) => {
  const query = "SELECT * FROM consomation where promo like '%castelnau%' order by date DESC";
  pool.query(query, (error, results) => {
    if(!results[0]){
      res.json({status : "not found"})
    }
    console.log({results})
    res.json({ results });
  })
  
})


app.get('/api/marseille', async (req, res) => {
  const query = "SELECT * FROM consomation where promo like '%marseille%' order by date DESC";
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

app.get('/api/aulnay', async (req, res) => {
  const query = "SELECT * FROM consomation where promo like '%aulnay%' order by date DESC";
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
  const query = "SELECT promo, count(cost) as promoTotalCost FROM consomation GROUP BY promo";
  pool.query(query, (error, results) => {
    if(!results[0]){
      res.json({status : "not found"})
    }
    console.log({results})
    res.json({ results });
  })
})

app.get('/api/endpoints', (req, res) =>{
  res.send(['http://localhost:3001/api/aulnay', 'http://localhost:3001/api/rennes', 'http://localhost:3001/api/marseille', 'http://localhost:3001/api/castelnau', 
'http://localhost:3001/api/nouvelle-aquitaine', 'http://localhost:3001/api/bordeaux', 'http://localhost:3001/api/rennes_ia', 'http://localhost:3001/api/nantes', 'http://localhost:3001/api/strasbourg', 'http://localhost:3001/api/all', 'http://localhost:3001/api/nancy'])
})


//INSERT INTO `consomation` (`promo` ,`date`,`cost`) VALUES ('Simplon NAQ Bordeaux IA1', '08-04-2021',  '3.9376197');


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

