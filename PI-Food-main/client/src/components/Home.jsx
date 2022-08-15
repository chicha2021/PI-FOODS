import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { getRecipes, filterByDiets, orderByScore, orderAlfa } from "../actions"
import Recipe from '../components/Recipe';
import { Link } from "react-router-dom";
import Paginado from "./Paginado";
import { SearchBar } from "./SearchBar";
import './Styles/Home.css'



export function Home() {
    const dispatch = useDispatch();
    const infoRecipes = useSelector( (state) => state.recipes);
    const [sort, setSort] = useState('');
    const [pagActual, setPagActual] = useState(1); //La página actual hasta el momento va a ser 0
    const [recetasPag, setRecetasPagActual] = useState(9); //La cantidad de recetas por página
    const indiceUltimaReceta = pagActual*recetasPag; //Si bien el indice tendria que ser 8, se utiliza 9 para que el slice pueda realizarse correctamente
    const indicePrimerReceta = indiceUltimaReceta - recetasPag;
    
    const recetasPagActual = infoRecipes.slice(indicePrimerReceta,indiceUltimaReceta);
    const paginado = (numberPag) => {setPagActual(numberPag)};

    useEffect( ()=>{
     if (infoRecipes.length === 0)dispatch(getRecipes());
    }, [dispatch]);

    function handleFilterDiets(e){
        e.preventDefault()
        dispatch(filterByDiets(e.target.value));
        
    }
    function handleFilterScore(e){
        e.preventDefault()
        dispatch(orderByScore(e.target.value));
        setPagActual(1);
        setSort(`${e.target.value}`);
    }

    function handleOrderAlfa(e){
        e.preventDefault();
        setSort(sort + 1)
        dispatch(orderAlfa(e.target.value))
    }


    return (
        <div className="home-nav">
         <SearchBar/>
         <h1>HENRY FOODS</h1>
        
        <section className="inline">
        <span >
         <h3 className="margin">TIPOS DE DIETA</h3>
            <select onChange={(e) => handleFilterDiets(e)}>
                <option value="All">Todas</option>
                <option value="lacto ovo vegetarian">Vegetarianas</option>
                <option value="vegan">Veganas</option>
                <option value="gluten free">Celíacas</option>
                <option value="dairy free">Sin Lactosa</option>
                <option value="whole 30">Whole 30</option>
                <option value="pescatarian">Pescatarian</option>
                <option value="ketogenic">Cetogénicas</option>
                <option value="fodmap friendly">Fodmap </option>
                <option value="primal">Primal</option>

            </select>
        </span>
        <span>
            <h3 className="margin">ORDEN ALFABÉTICO</h3>
            <select onChange={(e) => handleOrderAlfa(e)}>
                <option value="az">Aa-Zz</option>
                <option value="za">Zz-Aa</option>
            </select>
        </span>
        <span>
            <h3 className="margin">NIVEL SALUBRE</h3>
            <select onChange={(e) => handleFilterScore(e)}>
                <option value="Asc">Ascendente</option>
                <option value="Des">Descendente</option>
            </select>
        </span>
        
        </section>
        <Link to='/recipes'><button className="btn-home">CREAR RECETA</button></Link>
        

        <Paginado  recetasPag={recetasPag} infoRecipes={infoRecipes.length} paginado={paginado}/>
        {
            recetasPagActual?.map( (el) => {
                
                return (
                <div className="conteiner-div" key={el.id}>
                    
                    <div className="div-recipe">
                        <Recipe name={el.name} image={el.image} diets={el.diets} key={el.id} />
                        <Link to={`/home/${el.id}`}>
                        <button className="btn-info">+ INFO</button>
                    </Link>
                    </div>
                </div>
                    
                
            )
        })} 
        </div>
    );
}