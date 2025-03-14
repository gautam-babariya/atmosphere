import React, { useEffect, useRef, useState } from 'react'
import './Addproduct.css'
import axios from 'axios';


function Addproduct() {
    const cloudinaryRef = useRef();
    const widgetref = useRef();
    const cloude_name = import.meta.env.VITE_CLOUD_NAME;
    const uploadpresent = import.meta.env.VITE_CLOUD_UPLOADPRESENT;
    const changemeRef = useRef(null);
    const changemeRef2 = useRef(null);
    const changemeRef3 = useRef(null);
    let productdata = {}
    const labellist = ["name", "description", "price", "category"]

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetref.current = cloudinaryRef.current.createUploadWidget({
            cloudName: cloude_name,
            uploadPreset: uploadpresent,
        }, function (error, result) {
            if (!error && result && result.event === "success") {
                productdata.images = [result.info.secure_url];
                console.log(productdata);
                changemeRef.current.textContent = 'Uploaded';
                changemeRef.current.style.backgroundColor = 'rgb(46 155 0)';
                changemeRef.current.disabled = true;
            } else if (error) {
                console.error('Error during upload:', error);
            }
        });
    }, [])
    const cloudinaryRef2 = useRef();
    const widgetref2 = useRef();
    useEffect(() => {
        cloudinaryRef2.current = window.cloudinary;
        widgetref2.current = cloudinaryRef2.current.createUploadWidget({
            cloudName: cloude_name,
            uploadPreset: uploadpresent,
        }, function (error, result) {
            if (!error && result && result.event === "success") {
                productdata.images.push(result.info.secure_url);
                console.log(productdata);
                changemeRef2.current.textContent = 'Uploaded';
                changemeRef2.current.style.backgroundColor = 'rgb(46 155 0)';
                changemeRef2.current.disabled = true;
            } else if (error) {
                console.error('Error during upload:', error);
            }
        });
    }, [])
    const cloudinaryRef3 = useRef();
    const widgetref3 = useRef();
    useEffect(() => {
        cloudinaryRef3.current = window.cloudinary;
        widgetref3.current = cloudinaryRef3.current.createUploadWidget({
            cloudName: cloude_name,
            uploadPreset: uploadpresent,
        }, function (error, result) {
            if (!error && result && result.event === "success") {
                productdata.images.push(result.info.secure_url);
                console.log(productdata);
                changemeRef3.current.textContent = 'Uploaded';
                changemeRef3.current.style.backgroundColor = 'rgb(46 155 0)';
                changemeRef3.current.disabled = true;
            } else if (error) {
                console.error('Error during upload:', error);
            }
        });
    }, [])

    const handelchange = (e, index) => {
        if (index == 0) {
            productdata.name = e.target.value;
        }
        if (index == 1) {
            productdata.description = e.target.value;
        }
        if (index == 2) {
            productdata.price = e.target.value;
        }
        if (index == 3) {
            productdata.category = e.target.value;
        }
    }
    const uploadme = () => {
        try {
            const backendurl = import.meta.env.VITE_BACKEND_URL;
            console.log(productdata);
            axios.post(`${backendurl}/api/products/add`, productdata)
                .then((Response) => {
                    if (Response.data.message == "Product created successfully") {
                        alert("Product Added");
                        window.location.reloa();
                    }
                    else {
                        alert("Error during add product");
                    }
                })
        } catch {
            alert("API server error..")
        }
    }
    return (
        <div id='addvideo-div'>
            <header id='alsome-set' className="user-header">
                <h1 id='text-set'>Add Product</h1>
            </header>
            <div id='addvideo-elements' className="user-details">
                {[...Array(4)].map((_, index) => (
                    <div className="make-center form-group">
                        <label>{labellist[index]}</label>
                        <input
                            onChange={(e) => { handelchange(e, index) }}
                            id='addvideo-input'
                            className='user-data'
                            placeholder={labellist[index]}
                        />
                    </div>
                ))}
                <div className="make-center form-group">
                    <label>image1</label>
                    <button ref={changemeRef} onClick={() => widgetref.current.open()} id="dp-button">Upload Picture</button>
                </div>
                <div className="make-center form-group">
                    <label>image2</label>
                    <button ref={changemeRef2} onClick={() => widgetref2.current.open()} id="dp-button">Upload Picture</button>
                </div>
                <div className="make-center form-group">
                    <label>image3</label>
                    <button ref={changemeRef3} onClick={() => widgetref3.current.open()} id="dp-button">Upload Picture</button>
                </div>
            </div>
            <button onClick={uploadme} id="dp-button">Save</button>
        </div>
    )
}

export default Addproduct
