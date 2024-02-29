
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css"

export default function SinglePage() {

  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [showDataAll, setShowDataAll] = useState(true);
  const [isDetailView, setIsDetailView] = useState(false);
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
        // Loader component
        <div className="loader-container">
  
          <div className="loader"></div>
        </div>
      ) : (
        <div className='bgsinglepage ' >
       

          <h1 className='pt-28 sm:text-5xl text-3xl text-center text-orange-300 font-bold' >Bosnia and Herzegovina wonderful country</h1>
          <div className={` pb-10  grid  lg:grid-cols-2 grid-cols-1 gap-4 ${showDataAll ? 'show' : 'hide'}`} >

            {data.map((dat) => {
              return (
                <div
                  key={dat.id}
                  className={`bg-black bg-opacity-70 p-10 dataAll w-[60%] mt-20 ml-10 ${showDataAll ? 'show' : 'hide'}`}
                  onClick={() => {
                    setSelectedData(dat);
                    setShowDataAll(false);
                    setIsDetailView(true);
                  }}
                >
                  <img src={dat.imageUrl} />
                  <h2 className='bg-orange-200 lg:w-[30%] sm:w-[50%] w-[80%] p-3 mt-5  sm:text-xl text-lg font-bold tracking-[.10em]  '>
                    {dat.name}
                  </h2>
                  <h3 className='sm:text-lg text-sm bg-orange-300 p-5 w-[40%]  font-bold mt-5 mb-3 text-inherit'>Price {dat.price} $</h3>
                 
                  <h2 className='bg-orange-400 p-5 font-bold sm:text-xl text-sm ' >Natural products from the most beautiful Bosnian regions</h2>
                </div>

              );
            })}
          </div>

          <div  >
            {selectedData && (
              <div className='flex  justify-center  bgPocetne' >
                <div className={` bg-black text-white  text-xl  lg:w-[60%] w-[80%] sm:mt-20 mt-5 lg:p-20 sm:p-10 p-5 bg-opacity-70  details-container ${showDataAll ? 'hide' : 'show'}`}>
                  <div className='flex justify-center ' >
                    <img className=' lg:w-[80%] w-[100%] ' src={selectedData.imageUrl} />
                  </div>
                  <h2 className=' mt-5 mb-5 ' >{selectedData.name}</h2>
                  <p className=' mt-5 mb-5 sm:text-xl text-sm '>{selectedData.description}</p>
                  <p>Price: {selectedData.price} $</p>

                  {isDetailView && (
                    <button
                      className="bg-orange-400 mt-5 p-5 sm:w-[20%] w-[40%] "
                      onClick={() => {
                        setIsDetailView(false);
                        setShowDataAll(true);
                      }}
                    >
                      Back
                    </button>

                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
