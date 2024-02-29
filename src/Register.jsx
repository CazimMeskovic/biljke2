
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Welcome from './Welcome';
import Korisnik from './Korisnik';
import "./App.css"

const Register = () => {
  const [cart, setCart] = useState([]);
  const [availableFunds, setAvailableFunds] = useState(400);
  const [loading, setLoading] = useState(true);
  const [owerley, setOwerley] = useState(false);

  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    "ime": "",
    "prezime": "",
    "sifra": ''
  });
  const [showDataAll, setShowDataAll] = useState(true);
  const [showEror, setShowEror] = useState(true);
  const [provjeraRezultat, setProvjeraRezultat] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addToCart = (product) => {
    if (availableFunds >= product.price) {
      setCart([...cart, product]);
      setAvailableFunds(availableFunds - product.price);

      // Pošalji informacije o korpi na server
      saveCartToDatabase([...cart, product], formData, availableFunds);
    } else {
      alert("You don't have enough money, please top up your account");
    }
  };

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

  const handleAuthentication = async (e) => {
    e.preventDefault();

    try {
      // Slanje podataka na server pomoću Axios-a za kreiranje korisnika
      const response = await axios.post('https://biljke-sa-cart-bekend.onrender.com/kreiraj', formData);

      // Obrada odgovora od servera (ako je potrebno)
      console.log('Odgovor od servera za kreiranje:', response.data.kreirajJedan.ime);

      // Resetovanje forme nakon uspešne registracije
      setFormData({
        ime: '',
        prezime: '',
        sifra: ''
      });

      const rezultat = response.data.kreirajJedan.ime
      setProvjeraRezultat(rezultat);
      // Update the state with response data
      setFormData(response.data);
      setShowDataAll(false);
      // Učitaj korpu sa servera ako postoji
      loadCartFromDatabase(formData);

      console.log(rezultat)


    } catch (error) {
      // Obrada greške (ako je potrebno)
      console.error('Greška prilikom registracije:', error);
    }
    console.log(provjeraRezultat)
  };

  const saveCartToDatabase = async (cartData, formData, availableFunds) => {
    try {
      const response = await axios.post('https://biljke-sa-cart-bekend.onrender.com/save-cart', {
        formData,
        cartData,
        availableFunds
      });
      console.log(response); // Prikazi podatke u response.data
    } catch (error) {
      console.error('Greška prilikom čuvanja korpe u bazi podataka:', error.response.data);
      console.error('Greška prilikom čuvanja korpe u bazi podataka:', error);
    }
  };

  const loadCartFromDatabase = async (formData) => {
    try {
      const response = await axios.get('https://biljke-sa-cart-bekend.onrender.com/get-cart', {
        params: formData
      });

      console.log(response.data);

      if (response.data && response.data.kreirajJedan) {
        setCart(response.data.kreirajJedan);
      }
    } catch (error) {
      console.error('Greška prilikom učitavanja korpe iz baze podataka:', error);
    }

  };



  return (
    <>


      <div className={` ${showDataAll ? 'show' : 'hide'}`}>
        <div className='bgPocetne w-[100vw] h-[100vh] flex justify-center items-center'>
          <div className='lg:w-[40%] sm:w-[60%] w-[80%] lg:h-[50%] sm:h-[60%] h-[70%] pt-10 pb-10 bg-slate-900 bg-opacity-70 text-slate-200 flex flex-col justify-center items-center'>
            <h1 className={` ${showEror ? 'hide' : 'show'}  mb-5 text-2xl pl-5 pr-5 text-center text-red-400 `}  >Wrong Name or Password, Please tray agan !</h1>
            <h1 className='text-3xl font-bold mb-5'>Register</h1>
            <form className='text-lg' onSubmit={handleAuthentication}  >
              <label className='flex flex-row justify-between'>
                Name:
                <input
                  className='sm:m-1 m-3  w-[70%] text-black'
                  type='text'
                  name='ime'
                  value={formData.ime}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label className='flex flex-row justify-between'>
                Last name:
                <input
                  className='sm:m-1 m-3  w-[70%] text-black'
                  type='text'
                  name='prezime'
                  value={formData.prezime}
                  onChange={handleChange}
                />
              </label>
              <br />
              <label className=' flex flex-row  justify-between '>
                Password:
                <input
                  className='m-1 text-black'
                  type="password"
                  name="sifra"
                  value={formData.sifra}
                  onChange={handleChange} />
              </label>

              <div className='flex justify-center'>
                <button
                  className='bg-orange-400 bg-opacity-70 p-3 font-bold hover:bg-orange-500 tracking-[.10em]'
                  type='submit'
                  onClick={() => setShowEror(false)}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>


      <div className={` ${owerley ? ' dataAll' : 'hidden'}  absolute flex flex-col justify-center items-center  w-full h-[100%]   pl-5 opacity-90 bg-red-900 text-white `} >
        <div>
          <button className='  text-3xl font-bold ml-36' onClick={() => setOwerley(false)} >X</button>
        </div>
        <div>
          <h2 className='text-2xl pb-3 mt-5 ' >Shopping Cart</h2>

          <ul>
            {cart.map((item, index) => (
              <li key={index}>{item.name} - ${item.price}</li>
            ))}
          </ul>
          <p className='text-xl ' >Available Funds: ${availableFunds}</p>
        </div>
      </div>

      <div className=' flex lg:flex-row flex-col bg-red-400   w-[100%] h-[100%]  ' >
        <div>

          {(provjeraRezultat) ?

            <div className={` ${showDataAll ? 'hide' : 'show'} flex lg:flex-row-reverse flex-col-reverse bg-red-400 pt-20  w-[100%] h-[100%] pt-20 pb-32  `}>


              <div className=' xl:w-[80%]  max-h-[100%] overflow-auto pr-5  '>
                <div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-3 xl:gap-5 lg:gap-2 ml-[5%]  '>
                  {data.map((dat) => {
                    return (
                      <div key={dat.id} className='w-[80vw] p-5'>
                        <img src={dat.imageUrl} className='sm:h-[20vh] h-[40vh] sm:w-[15vw] w-[100vw] border-4 border-solid border-orange-400 ' />
                        <h2 className='text-xl font-bold pt-2'>{dat.name}</h2>
                        <h3 className='text-lg pb-3 pt-3'>Price {dat.price} $</h3>
                        <button className='p-3 font-bold bg-orange-400 rounded-lg hover:bg-orange-500' onClick={() => { addToCart(dat), setOwerley(true) }}  >
                          Add to Cart
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {
                <div>

                  <Korisnik ime={provjeraRezultat} />


                </div>

              }
            </div>
            // ako se ne uloguje ovo mu daj
            : null
          }
        </div>

      </div>

    </>
  );
};

export default Register;
