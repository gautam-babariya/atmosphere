import React, { useEffect, useState } from 'react'
import './Cards.css'
import Card from '../../Subcomponents/Card/Card'
import axios from 'axios';
const backendurl = import.meta.env.VITE_BACKEND_URL;
import { useParams } from 'react-router-dom';


function Cards() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${backendurl}/api/products`)
      .then(response => {
        setProducts(response.data);        
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);
  return (
    <div id='cards-container'>
      {products
        .filter(product => product.name.replace(/\s+/g, '') === id)
        .map((product) => (
          <Card
            key={product._id}
            orderid = {product._id}
            img={product.images[0]}
            name={product.name}
            price={product.price}
          />
        ))
      }
      {products
        .filter(product => product.name.replace(/\s+/g, '') !== id)
        .map((product) => (
          <Card
            key={product._id}
            orderid = {product._id}
            img={product.images[0]}
            name={product.name}
            price={product.price}
          />
        ))
      }
    </div>
  )
}

export default Cards
