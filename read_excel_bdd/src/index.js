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
//console.log('lecture du fichier excel');
    
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
            // } // en utlisant cet mode json ça marche pas, on peut faire la requete

                       
            // //enregistre en forme json
            // liste_conso.push(conso);

            //enregistre en forme des tuples
            liste_conso.push([rows[i][0],rows[i][2],rows[i][4],rows[i][9]]);
            
        }
        //lecture de la consomation du fichier excel recuperé
        //console.log(liste_conso);
        
        //execution de la function d'enregestriment des donnes
        //ça marche pas, je suis en train de voir au niveaux de la commande d enregestriment node
        //cuando on doit utiliser un array ou un json.
        connec_bdd.save_data(liste_conso);
        

    });
    /** TESTS AVEC DIFFERENTES TAILLES DE ARRAY, MAIS ÇA MARCHE PAS */
    // lista = [[ 'DP100 Sponsorship', '1/14/2021', 'Logic Apps', '0,0001' ],
    // [ 'DP100 Sponsorship', '1/14/2021', 'Virtual Network', '0,0792' ],
    // [ 'DP100 Sponsorship', '1/14/2021', 'Logic Apps', '0,00000072' ],
    // [ 'DP100 Sponsorship', '1/14/2021', 'Logic Apps', '0,00025' ],
    // [
    //   'DP100 Sponsorship',
    //   '1/14/2021',
    //   'Virtual Machines',
    //   '6,05600592'
    // ],
    // [ 'DP100 Sponsorship', '1/14/2021', 'Bandwidth', '0,004430823' ],
    // [ 'DP100 Sponsorship', '1/14/2021', 'Bandwidth', '0,00000275' ],
    // [ 'DP100 Sponsorship', '1/14/2021', 'Storage', '0,3746340864' ],
    // [
    //   'DP100 Sponsorship',
    //   '1/14/2021',
    //   'Virtual Network',
    //   '0,040933332'
    // ],
    // [ 'DP100 Sponsorship', '1/15/2021', 'Logic Apps', '0,0001' ],
    // [
    //   'DP100 Sponsorship',
    //   '1/15/2021',
    //   'Virtual Network',
    //   '0,0935949996'
    // ],
    // [ 'DP100 Sponsorship', '1/15/2021', 'Logic Apps', '0,00000072' ],
    // [ 'DP100 Sponsorship', '1/15/2021', 'Logic Apps', '0,00025' ],
    // [
    //   'DP100 Sponsorship',
    //   '1/15/2021',
    //   'Virtual Machines',
    //   '6,05600112'
    // ],
    // [ 'DP100 Sponsorship', '1/15/2021', 'Bandwidth', '0,003270678' ],
    // [ 'DP100 Sponsorship', '1/15/2021', 'Bandwidth', '0,00000025' ],
    // [ 'DP100 Sponsorship', '1/15/2021', 'Storage', '0,3746340864' ],
    // [
    //   'DP100 Sponsorship',
    //   '1/15/2021',
    //   'Virtual Network',
    //   '0,052527776'
    // ],
    // [ 'DP100 Sponsorship', '1/16/2021', 'Logic Apps', '0,0001' ],
    // [
    //   'DP100 Sponsorship',
    //   '1/16/2021',
    //   'Virtual Network',
    //   '0,0899510004'
    // ],
    // [ 'DP100 Sponsorship', '1/16/2021', 'Logic Apps', '0,00000072' ],
    // [ 'DP100 Sponsorship', '1/16/2021', 'Logic Apps', '0,00025' ],
    // [ 'DP100 Sponsorship', '1/16/2021', 'Virtual Machines', '6,0400056' ],
    // [ 'DP100 Sponsorship', '1/16/2021', 'Bandwidth', '0,000463623' ],
    // [ 'DP100 Sponsorship', '1/16/2021', 'Storage', '0,3746340864' ],
    // [
    //   'DP100 Sponsorship',
    //   '1/16/2021',
    //   'Virtual Network',
    //   '0,040777776'
    // ],
    // [ 'DP100 Sponsorship', '1/17/2021', 'Logic Apps', '0,0001' ],
    // [
    //   'DP100 Sponsorship',
    //   '1/17/2021',
    //   'Virtual Network',
    //   '0,0755499996'
    // ]];
    
    // //lista =[[`DP100 Sponsorship`, `1/7/2021`, `Key Vault`, `hola`],[`DP100 Sponsorship22`, `1/7/2021`, `Key Vault`, `hola6`]] ;
    // // lista=[["Simplon Rennes","1/25/2021","Load Balancer","hola"],["Simplon Rennes","1/25/2021","Storage","hola"]];
    // // //lista=["Simplon Rennes","1/25/2021","Load Balancer","hola"];
    // connec_bdd.save_data(lista);
    console.log('C EST LA FIN, VAMOS!!!');
