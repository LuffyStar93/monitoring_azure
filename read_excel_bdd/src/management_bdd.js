const mysql = require('mysql2');

//il faudra voir comme diferencier la connection pour lapremier fois, sans bdd et
//depuis avec la bdd, A VOIR!!
var con = mysql.createConnection({
    host: "localhost",//"52.167.230.124", //==> VM les4M
    user: "root",
    /*password: "pwd", //==> utiliser avec la VM les4M */
    database : 'monitoring' //==> enlever pour la premier utilisation
  });


module.exports = {
    connexion_bdd: async function () {
        con.connect(function(err) {
          if (err) throw err;
          console.log("Connected!");
        });
    },
    //ça functionne, il faut l'utiliser avant la premier utlisation pour avoir la BDD
    //depuis il faut utiliser la connection avec la BDD
    create_bdd: async function(){
      con.connect(function(err) {
          if (err) throw err;
            console.log("Connecté à la base de données MySQL!");
      con.query("CREATE DATABASE IF NOT EXISTS monitoring;", function (err, result) {
              if (err) throw err;
              console.log("Base de données créée !");
            });
        });
    },
    create_table: async function(){
      con.connect(function(err) {
          if (err) throw err;
            console.log("Connecté à la base de données MySQL!");
      
      //il faut modifier depuis le types des champs apres
      con.query("CREATE TABLE IF NOT EXISTS consomation (id INTEGER AUTO_INCREMENT PRIMARY KEY, promo VARCHAR(255) NOT NULL , date VARCHAR(50), cost VARCHAR(200)) ", function (err, result) {
              if (err) throw err;
              console.log("table consomation créée !");
            });
        });
    },
    save_data: async function (donnes) {
      
      var liste_json = JSON.stringify(donnes);// stringify convertit une valeur JavaScript en chaîne JSON
      //console.log('valeur JSON ==> ', json);
      con.connect(function(err) {
        if (err) throw err;
          console.log("Connecté à la base de données MySQL dans save_data!"); 
      
      //je continue à tester comment enregistrer avec plusiers transactions
        let req_query = "INSERT INTO `consomation` (`promo` ,`date`,`service`,`cost`) VALUES ? ;";
        console.log('********** requete *********');
        console.log(req_query);
        con.query(req_query, donnes, function (err, result, fields) {
              if (err) throw err;
              console.log("donnes enregistre !");
              console.log("Number of records inserted: " + result.affectedRows);
              console.log(result); // results contains rows returned by server
              console.log(fields); // fields contains extra meta data about results, if available
          });

      });
      // whatever
    }
  };


/**
 * BLOQUE CONNEXION ET ENREGISTRIMENT BDD
 */
 

 
  
