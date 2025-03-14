import React, { useEffect, useState } from 'react'
import './Deleteproduct.css'
import Card from '../../Subcomponents/Card/Card'
import axios from 'axios';
const backendurl = import.meta.env.VITE_BACKEND_URL;
import deletesvg from './storage/deletesvg.svg'

function Deleteproduct() {
  const [products, setProducts] = useState([]);
  const [refresh,setRefresh] = useState(true);

  useEffect(() => {
    axios.get(`${backendurl}/api/products`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, [refresh]);

  const deleteme = (id) => {
    try {
      axios.delete(`${backendurl}/api/products/${id}`)
        .then((Response) => {
          if (Response.data.message == "Product deleted successfully") {
            alert("Product deleted")
            setRefresh(!refresh)
          }
          else {
            alert("Error during delete product")
            setRefresh(!refresh)
          }
        })
    } catch {
      alert("API server error..")
      setRefresh(!refresh)
    }
  }
  return (
    <div id='cards-container'>
      {products.map((product) => (
        <div id='deletepro-div'>
          <Card
            key={product._id}
            orderid={product._id}
            img={product.images[0]}
            name={product.name}
            price={product.price}
          />
          <div onClick={() => { deleteme(product._id) }} id='delete-div'>Delete <img id='svgdelete' src={deletesvg} alt='delete' /></div>
        </div>
      ))
      }
    </div>
  )
}

export default Deleteproduct
