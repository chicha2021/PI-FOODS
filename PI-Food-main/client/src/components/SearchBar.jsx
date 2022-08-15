import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { searchRecipes } from "../actions";
import './Styles/SearchBar.css'


export function SearchBar(){

    const [recipe, setRecipe] = useState('');
    const dispatch = useDispatch()

    function handleInput (e){
        setRecipe(e.target.value);
        console.log(e.target.value)
        
        
    }
    function handleSubmit(e) {
        e.preventDefault()
        dispatch(searchRecipes(recipe));
        // setRecipe('')
    }

    return (
        <>
        <input 
                type="text" 
                placeholder="Buscar recetas..."
                onChange={(e) => handleInput(e)} 
                id="name"
                className="input-detail" />

        <button type="submit"
                className="btn-consul" 
                onClick={(e) => {handleSubmit(e)}}>CLICK</button>
        </>
    )
};