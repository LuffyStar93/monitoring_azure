var connec_bdd = require('./management_bdd');
const xlsxFile = require('read-excel-file/node'); // imports the package.

/**
 * executer node index.js, si on utilise npm start, il y a un erreur qui sort, en relation aux promises il faut que je vois ça...
 * l execution du fichier prends quelque secondes, premier s'affichera les messages et depuis les donnes
 * pour la premier connexion decommenté connec_bdd.create_bdd(); et commenté connec_bdd.create_table();
 * et depuis faire l'envers pour creer la table
 */

console.log('Section BDD');
//connec_bdd.create_bdd(); //utiliser pour la premier connexion
connec_bdd.create_table(); //une fois cree la BDD decommenter cet ligne mais commenter celui d avant, la ligne 5

//file excel [0] SubscriptionName
//file excel [1] SubscriptionGuid
//file excel [2] Date  --> 	The usage or purchase date of the charge. / La date d'utilisation ou d'achat de la charge.
//file excel [3] ResourceGuid
//file excel [4] ServiceName
//file excel [5] ServiceType
//file excel [6] ServiceRegion
//file excel [7] ServiceResource
//file excel [8] Quantity   --> The number of units purchased or consumed / Numero des unites achete ou consomé
//file excel [9] Cost -->Cost of the charge in the billing currency before credits or taxes / Coût de la charge dans la devise de facturation avant crédits ou taxes

/**
 *  BLOQUE LECTURE FICHIER EXCEL
 */
console.log('lecture du fichier excel');
    
    xlsxFile('./files_excel/7adeb9ae-5a8b-497d-897d-aab0d1f6da85.xlsx').then(rows => {
        // `rows` is an array of rows
        // each row being an array of cells.   
        //console.log(rows); pour afficher tous

        // Remove Header ROW
        rows.shift();//enleve la premier f
        
        const liste_conso = [];

        let length = rows.length;

        for(let i=0; i<length; i++){

            //on filtre les donnes qu on veut utiliser
            //peut etre il faudra modifier cost, remplacer ',' par '.' comme Amin a dit, je sais pas?
            // let conso = {
            //     promo: rows[i][0],
            //     date: rows[i][2],
            //     service: rows[i][4],
            //     cost: rows[i][9]
            // }
            
            // //enregistre en forme json
            // liste_conso.push(conso);

            //enregistre en forme des tuples
            liste_conso.push([rows[i][0],rows[i][2],rows[i][4],rows[i][9]])
            
        }
        //lecture de la consomation du fichier excel recuperé
        console.log(liste_conso);
        
        //POUR LE MOMENT IL Y A UNE ERREUR, JE SUIS EN TRAIN DE LE TRAITER
        //execution de la function d'enregestriment des donnes
        //ça marche pas, je suis en train de voir au niveaux de la commande d enregestriment node
        //cuando on doit utiliser un array ou un json.
        //connec_bdd.save_data(liste_conso);
        

    });
    
   console.log('C EST LA FIN, VAMOS!!!');
