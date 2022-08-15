import React from "react";

export default function Paginado({infoRecipes, recetasPag, paginado}) {

    const pageNumbers = [];
    const navNumbers = Math.ceil(infoRecipes / recetasPag); //Este resultado da 11 
    
    for (let i = 0; i < navNumbers; i++) {  // El for recorre la barra de numeros del 0 al 11 y va pusheando numero a numero para formar 
        pageNumbers.push(i+1);              // El paginado 1, 2, 3, ,4, 5,...
        
    }

    return (
        <nav>
            <ul className="paginado">
                {pageNumbers?.map( (num)=>(
                
                        <li className="number" key={num}>
                            <a onClick={()=> paginado(num)} >{num}</a> 
                        </li>
                    ))}
            </ul>
        </nav>
    )
}