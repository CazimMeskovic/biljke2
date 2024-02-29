

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 

export default function Podaci() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.get('https://biljke-sa-cart-bekend.onrender.com/vans');

        if (response && response.data && response.data.length > 0) {
          setData(response.data);
        }
      } catch (error) {
        console.error('Greška prilikom dohvaćanja podataka:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <div className='grid grid-cols-2 gap-4'>
          {data.map((dat, index) => (
            <div key={index} className='w-[80%] mt-10 ml-10'>
              <img className='' src={dat.imageUrl} />
              <h2 className='bg-red-200 w-[20%] p-3 mt-5 text-center text-xl'> {dat.name} </h2>
              <h3 className='text-lg mt-5 mb-3 text-inherit'> Price {dat.price} $ </h3>
             
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
