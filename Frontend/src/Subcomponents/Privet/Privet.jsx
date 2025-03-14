import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from "axios";

const Privet = ({ children }) => {
    const [isVerified, setIsVerified] = useState(null);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const productData = {
                    user_id: localStorage.getItem('user_id'),
                    mytoken: localStorage.getItem('mytoken'),
                };
                const backendurl = import.meta.env.VITE_BACKEND_URL;
                axios.post(`${backendurl}/api/auth/verify`, productData)
                    .then((Response) => {
                        if (Response.data.message == "Token and user ID are valid") {
                            setIsVerified(true)
                        }
                        else{
                            setIsVerified(false)
                        }
                    })
            } catch {
                setIsVerified(false);
            }
        };
        verifyUser();
    }, []);

    if (isVerified === null) return <div>Loading...</div>;
    return isVerified ? children : <Navigate to="/register" />;
};

export default Privet;
