import React from "react";


export default function Recipe({name, image, diets}) {
    return (
        <>
        <h3>{name}</h3>
        <img src={image} alt="img not found" />
        <div>{diets}</div>
        </>
    );
}