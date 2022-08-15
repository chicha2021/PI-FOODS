import React from "react";
import { getDiets, postRecipe } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import './Styles/CreateRecipe.css'





function validateForm(input) {
    const errors = {};
    if (!input.name) {
        errors.name = 'El nombre es obligatorio';
    }
    if (!input.summary) {
        errors.summary = 'Un breve resumen es obligatorio';
    }
    return errors;
}


export default function CreateRecipe(){
    
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({});
    const diets = useSelector( (state)=> state.diets);
    const history = useHistory()

    const [form, setForm] = useState({
        name:"",
        summary: "",
        health_score: 0,
        steps:"",
        diets:[], //Para guardar más de una dieta debemos colocarlo como array
    })

    function handleDelete(e) {
        setForm({
            ...form,
            diets: form.diets.filter( diet => diet !== e) //Va a cargar el estado de react con todas las dietas que no sean la que yo cliquee
        })
    }

    useEffect(()=>{
        dispatch(getDiets());
    }, [dispatch])

    function stateInput(e) {
        setForm({ //Al ser un objeto debemos pasarle el obj y no solo los inputs
            ...form,
            [e.target.name]: e.target.value
        });
        setErrors(validateForm({
            ...form,
            [e.target.name]: e.target.value
        }));
    }
    function stateSelect(e) {
        setForm({
            ...form,
            diets: [...form.diets, e.target.value] //Para que vaya agregando las dietas que deseamos pasarle al post
        })
    }


    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postRecipe(form));
        alert('¡Receta creada correctamente!')
        setForm({
            name:" ",
            summary: " ",
            health_score: 0,
            steps:"",
            diets:[],
        })
        history.push('/home')
    }
    
    return (
        <div className="conteiner-create">
                <Link to={'/home'}><button className="btn-form">VOLVER AL HOME</button></Link>
                <h1>CREÁ TU RECETA</h1> 
                <form className="detail-form">
                     <div className="label-detail">
                         <div>
                            <label>Nombre:</label>
                             <input type="text" name="name" value={form.name} onChange={(e)=> stateInput(e)}/>
                                { errors.name && ( <p className="colour">{errors.name}</p>)}
                         </div>
                         <div>
                            <label>Resumen:</label>
                            <input type="textarea" name="summary" value={form.summary} onChange={(e)=> stateInput(e)}  />
                            { errors.summary && ( <p className="colour">{errors.summary}</p>)} 
                         </div>
                         <div>
                            <label>Saludable:</label>
                            <input type="number" name="health_score" value={form.health_score} onChange={(e)=> stateInput(e)}/> 
                         </div>
                         <div>
                            <label>Pasos:</label>
                            <input type="text" name="steps" value={form.steps} onChange={(e)=> stateInput(e)}/> 
                         </div>

                    </div>
                    <select id="diets" onChange={(e)=> stateSelect(e)}>
                    { diets && diets.map( (diet)=> (
                        <option value={diet.name}>{diet.name}</option>
                    ))}
                    </select>
                    <button type="submit" onClick={(e) =>handleSubmit(e) }>CREAR RECETA</button>
                 </form>

                {form.diets?.map( (e) => (
                <div>
                    <p>{e}</p>
                    <button className="btn-delete" onClick={()=> handleDelete(e)}>x</button>
                </div>
                ))}
            
        </div>
    )
};