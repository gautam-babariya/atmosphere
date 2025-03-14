import React, { useEffect, useRef, useState } from 'react';
import './Productdet.css';
import img from './storage/demoimg.png';
import img2 from './storage/backimg.svg';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const backendurl = import.meta.env.VITE_BACKEND_URL;

const ProductDet = () => {
    const addcartRef = useRef([]);
    const [images, setImages] = useState([]);
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [cartProduct, setcartProduct] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [count, setCount] = useState(1);
    const handleNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const addToCart = async () => {
        const backendurl = import.meta.env.VITE_BACKEND_URL;
        const url = `${backendurl}/api/auth/cart/add`;

        const data = {
            userId: localStorage.getItem('user_id'),
            productId: products._id
        };

        try {
            const response = await axios.post(url, data);
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 2xx
                console.error("❌ Error adding item:", error.response.data.message);
            } else if (error.request) {
                // Request was made but no response was received
                console.error("❗ No response from server.");
            } else {
                // Error during request setup
                console.error("❗ Request error:", error.message);
            }
        }
        changeContent();
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
    const isIdInList = (id, list) => {
        return list.some(item => item === id);
    };
    const changeContent = () => {
        if (addcartRef.current) {
            addcartRef.current.innerHTML = `ADDED`;
        }
    };

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
                    <p className="price">₹{products.price}<span className="old-price">₹{products.price - products.price * 20 / 100}</span></p>
                    <div className="category">Category: {products.category}</div>
                    <div className="quantity-control">
                        <button onClick={() => setCount(count > 1 ? count - 1 : 1)} id='button1'>-</button>
                        <span id='inputcount'>{count}</span>
                        <button onClick={() => setCount(count + 1)} id='button2'>+</button>
                    </div>
                    {isIdInList(products._id, cartProduct) ? (
                        <button className="add-to-cart" disabled>ADDED</button>
                    ) : (
                        <button ref={addcartRef} onClick={addToCart} className="add-to-cart">ADD TO CART</button>
                    )}
                </div>
            </div>
            <div id='product-des'>
                <h2>Product Description</h2> {products.description}
            </div>
        </>
    );
};

export default ProductDet;