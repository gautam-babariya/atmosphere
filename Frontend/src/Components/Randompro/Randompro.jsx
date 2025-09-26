import React, { useEffect, useState } from 'react'
import './Randompro.css'
import Card from '../../Subcomponents/Card/Card'
import axios from 'axios';
const backendurl = import.meta.env.VITE_BACKEND_URL;
import { useParams } from 'react-router-dom';


function Randompro() {
    const { id } = useParams();
    const [products, setProducts] = useState([]);

    // useEffect(() => {
    //     axios.get(`${backendurl}/api/products`)
    //         .then(response => {
    //             setProducts(response.data);

    //         })
    //         .catch(error => {
    //             console.error('There was an error fetching the products!', error);
    //         });
    // }, []);

    const getRandomProducts = (arr, count) => {
        const shuffled = [...arr].filter(product => product.name.replace(/\s+/g, '') !== id)
            .sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const randomProducts = getRandomProducts(products, 4);
    return (
        <div id='cards-container'>
            {randomProducts.map((product) => (
                <Card
                    key={product._id}
                    orderid={product._id}
                    img={product.images[0]}
                    name={product.name}
                    price={product.price}
                />
            ))}
        </div>
    )
}

export default Randompro
