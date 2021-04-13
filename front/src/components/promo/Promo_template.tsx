import React, { useState, useEffect } from 'react';
import './Promo_template.css';
import axios from 'axios';



const SimplonCloud = (props:any) => {
  const [userData, setUserData] = useState<any>({});
  const url = props.location.state.url;
  const name = props.location.state.nom;
  console.log(props.location.state);

  useEffect(() => {
    getDataFetch();
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
          {userData.length > 0 && userData.map(event => (<tr>
                  <td>{event.date}</td>
                  <td>{event.service}</td>
                  <td>{event.cost} $</td>
               </tr>))}

        </tbody>
      </table>

      <ul>
        {/* {JSON.stringify(userData)}  */}
      </ul>
      
    </div>
  );
};



export default SimplonCloud;