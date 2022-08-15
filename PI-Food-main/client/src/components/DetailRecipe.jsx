import React from "react";
import { useEffect } from "react";
import { detailRecipe } from "../actions";
import {useDispatch, useSelector} from "react-redux";
import { Link, useParams } from "react-router-dom";
import './Styles/DetailRecipe.css'



export default function DetailRecipe({match}) {
    
    const dispatch = useDispatch();
    const {id} = useParams();
    
    useEffect(()=> {
        dispatch(detailRecipe(id));
    }, [dispatch, id]);
    
    const recipe = useSelector( (state)=> state.detail);
    console.log(recipe)

    

    return (
        <div className="detail">
            
                {console.log(recipe)} 
                { recipe?
                 <div className="div-detail">
                     <h1 className="detail-name">{recipe.name && recipe.name}</h1>
                     <img src={recipe.img? recipe.img : recipe.image} alt="Image not found" />
                     <h3>TIPO DE PLATO:</h3>
                     <p>{recipe.dishType && recipe.dishType}</p>
                     <h3>TIPOS DE DIETA:</h3>
                     <p>{recipe.dishDiet && recipe.dishDiet}</p>
                     <h3>RESUMEN DEL PLATO:</h3>
                     <p>{recipe.summary && recipe.summary.replace(/<[^>]+>/g,"")}</p>              
                  </div> : 
                    <>Loading...</> 
                }




                <Link to='/home'><button>VOLVER </button></Link>
        </div> 
    )
}