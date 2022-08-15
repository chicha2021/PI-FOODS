import axios from 'axios';


export function getRecipes(){
    return async function (dispatch) {
        let infoApi = await axios(`http://localhost:3001/recipes`);//Acá se produce la conexión del back con el f
        console.log(infoApi)
        return dispatch({
            type: 'GET_RECIPES', //Para despachar la acción necesitamos pasarle un tipo de accion y la data del payload
            payload: infoApi.data
            
        }); 
    }; //Esta action esta hecha con async await, pero si querríamos hacerlo con promesas debemos hacer .then() como en el m2
};

export function filterByDiets(payload) {
    console.log(payload)
    return {
        type: 'FILTER_DIETS',
        payload, //Acá llegaría el tipo de dieta
    }
}

export function orderAlfa(payload){
    console.log(payload)
    return {
        type: 'ORDEN_ALFA',
        payload, //Acá llegaría el tipo de dieta
    }
}



export function orderByScore(payload) {
    console.log(payload)
    return {
        type: 'FILTER_SCORE',
        payload, //Acá llegaría el HEALTH SCORE
    }
}


export  function searchRecipes(payload){
    return async function (dispatch) {
        try {
            var searchRecipe = await axios.get(`http://localhost:3001/recipes?name=${payload}`, {})
            console.log(searchRecipe)
            return dispatch({
                type: 'SEARCH_RECIPES',
                payload: searchRecipe.data
            });
        } catch (error) {
            alert('Error por API o Internet')
        }
    }
}


export function getDiets (){
    return async function (dispatch){
        try {
            const json = await axios.get(`http://localhost:3001/diets`);
            
            return dispatch({
                type: 'GET_DIETS',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};


export function postRecipe(body){  //Se le adjunta la info que le pasamos al formulario
    return async function(dispatch){
        try {
            const recipes = await axios.post(`http://localhost:3001/recipes`,body) //Se le agrega la info del body
            console.log(recipes)
            return recipes;
        } catch (error) {
            console.log(error)
        }
    }
};


export function detailRecipe(id){
    console.log(id)
    return async function (dispatch) {
        try {
            var detail = await axios.get(`http://localhost:3001/recipes/`+ id);
            
            return dispatch({
                type: 'DETAIL_RECIPE',
                payload: detail.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}