import React from 'react'


const addToCart = (product) => {
    if (availableFunds >= product.price) {
      setCart([...cart, product]);
      setAvailableFunds(availableFunds - product.price);
    } else {
      alert("Insufficient funds!");
    }
  };

  export default addToCart;
  