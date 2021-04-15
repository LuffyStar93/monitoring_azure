import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './totalCost.css';

const About = () => {
  const [userData, setUserData] = useState<any>({});

  useEffect(() => {
    getDataFetch();
  // eslint-disable-next-line
  }, []);

  const getDataFetch = async () => {
    const response = await axios.get("https://monitoresimploncost.azurewebsites.net/api/conso/promo");
    if(response.data){
      setUserData(response.data.results);
      console.log(response.data.results);
      console.log('userdata=',userData)
    }
  }
  return (
    <div id="section-cost">
      <h3 id="title_h3">Coût total par promo :</h3>
      <div id="list">
      {userData.length > 0 && userData.map(row => (<ul>
                  <li>Le cout total de la promo {row.promo} est de {row.promoTotalCost} $</li>
               
               </ul>))}
               </div>
    </div>
  );
};


export default About;