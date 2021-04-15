import React, { useState, useEffect } from 'react';
import './Promo_template.css';
import axios from 'axios';



const Promo_data = (props:any) => {
  const [userData, setUserData] = useState<any>({});
  const url = props.location.state.url;
  const name = props.location.state.nom;
  console.log(props.location.state);


  useEffect(() => {
    getDataFetch();
  // eslint-disable-next-line
  }, []);

  const getDataFetch = async () => {
    const response = await axios.get(url);
    if(response.data){
      setUserData(response.data.results);
      console.log(response.data.results);
      console.log('userdata=',userData)
    }
  };

  return (
    <div id="uptake_section">
      
      <h2>Consommation {name} </h2>
      <table className="uptake_table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Nom du service</th>

            <th>Coût</th>
          </tr>
        </thead>
        <tbody>
          {userData.length > 0 && userData.map(row => (<tr>
                  <td>{row.date}</td>
                  <td>{row.service}</td>
                  <td>{row.cost} $</td>
               </tr>))}

        </tbody>
      </table>
    </div>
  );
};


export default Promo_data;