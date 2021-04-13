var connec_bdd = require('./management_bdd');
const xlsxFile = require('read-excel-file/node'); // imports the package.

/**
 * l execution du fichier prends quelque secondes, premier s'affichera les messages et depuis les donnes
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
        rows.shift();//enleve la premier ligne avec le nom des colonnes
        
        //array où on recupere les lignes qu on veut enregistrer
        const liste_conso = [];

        //combien des lignes on a obtenue du fichier excel
        let length = rows.length;

        for(let i=0; i<length; i++){

            //enregistre un array dans un autre array
            let promo = rows[i][0]; //on enregistre la colonne promo
            //pour verifier si on trouve Simplon
            if(promo.indexOf("Simplon") != -1 ){
                liste_conso.push([rows[i][0],rows[i][2],rows[i][4],rows[i][9]]);
            }            
            
        }
        //lecture de la consomation du fichier excel recuperé
        //console.log(liste_conso);
        
        //execution de la function d'enregestriment des donnes
        connec_bdd.save_data(liste_conso);        

    });
    
    console.log('C EST LA FIN, VAMOS!!!');
