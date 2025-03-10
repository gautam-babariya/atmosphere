import React, { useEffect, useState } from 'react';
import './Productdet.css';
import img from './storage/demoimg.png';
import img2 from './storage/backimg.svg';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const backendurl = import.meta.env.VITE_BACKEND_URL;


const ProductDet = () => {
    const [images, setImages] = useState([]);
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [count, setCount] = useState(1);
    const handleNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    useEffect(() => {
        axios.get(`${backendurl}/api/products`)
          .then(response => {
            const indorData = response.data.find(product => product._id === id);
            const indorImages = response.data
                    .filter(product => product._id === id)
                    .flatMap(product => product.images);  // Collect all image URLs
            setProducts(indorData);
            setImages(indorImages);
          })
          .catch(error => {
            console.error('There was an error fetching the products!', error);
          });
      }, []);

      if (!products) return <p>Loading...</p>;
    return (
        <>
            <div className="product-detail">
                <div className="product-image">
                    <div className="image-slider">
                        <button className="slider-button" onClick={handlePrev}>❮</button>
                        <img src={images[currentImageIndex]} alt="Product" className="main-image" />
                        <button className="slider-button" onClick={handleNext}>❯</button>
                    </div>
                    <div className="thumbnails">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Thumbnail ${index}`}
                                className={`thumbnail ${currentImageIndex === index ? 'active' : ''}`}
                                onClick={() => setCurrentImageIndex(index)}
                            />
                        ))}
                    </div>
                </div>
                <div className="product-info">
                    <h1>{products.name}</h1>
                    <p className="price">₹{products.price}<span className="old-price">₹{products.price-products.price*20/100}</span></p>
                    <div className="category">Category: {products.category}</div>
                    <div className="quantity-control">
                        <button onClick={() => setCount(count > 1 ? count - 1 : 1)} id='button1'>-</button>
                        <span id='inputcount'>{count}</span>
                        <button onClick={() => setCount(count + 1)} id='button2'>+</button>
                    </div>
                    <button className="add-to-cart">ADD TO CART</button>
                </div>
            </div>
            <div id='product-des'>
                <h2>Product Description</h2> {products.description}
            </div>
        </>
    );
};

export default ProductDet;