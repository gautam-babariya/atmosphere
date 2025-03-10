import React from 'react'
import './Heroimg2.css'
import { useNavigate } from 'react-router-dom';


function Heroimg2() {
    const navigate = useNavigate();
    const handelredirect = ()=>{
        navigate(`/productsell/0`);
    }
    return (
        <div id='heroimg2-container'>
            <div id='heroimg2-subcontainer'>
            <div id='heroimg2-title'>The Ultimate Guide to
                Low-Maintenance
                Houseplants</div>
            <div id='heroimg2-button'>
                <button onClick={handelredirect} id="heroimg2-shop">Shop Now</button>
            </div>
            </div>
        </div>
    )
}

export default Heroimg2
