import React from 'react';
import {Link} from 'react-router-dom';
import './Styles/Landing.css'



export default function LandingPage(){
    return (
        <div className='landing-detail'>
            <div>
                <h1>RECETAS DE HENRY</h1>
            <Link to='/home'>
                <button>Ingresar</button>
            
            </Link>
            </div>
        </div>
    )
}