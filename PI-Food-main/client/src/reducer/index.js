const initialState = {
    recipes : [],                //Estado interno
    altRecipes: [],
    diets: [],
    detail: []
}



function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_RECIPES':
            return {
                ...state,  //Concatenamos lo que ya tenia el state, aunque en este caso esta vacío
                recipes: action.payload, //Acá esta la info de la api que viene con la funcion asyncrona
                altRecipes: action.payload
            }
        case 'FILTER_DIETS':
            const allDiets = state.altRecipes
            const filterDiets = action.payload === 'All'? allDiets : allDiets.filter(r => r.diets.includes(action.payload));
            return {
                ...state,
                recipes: filterDiets //Se modifica este estado pero sin embargo siempre queda el alternativo para seguir utilizando toda la info
            }
        case 'FILTER_SCORE':
            const orderScore = action.payload === 'Asc'? 
            state.recipes.sort((a,b) => {
              if (a.health_score > b.health_score ) return 1
              if (a.health_score < b.health_score ) return -1
              else return 0    
            }) : 
            state.recipes.sort((a,b) => {
                if (a.health_score > b.health_score ) return -1
                if (a.health_score < b.health_score ) return 1
                else return 0 
            });
            return {
                ...state,
                recipes: orderScore
            }
        
            case 'ORDEN_ALFA':
            const orderAlfabet = action.payload === 'az'?
            state.recipes.sort((a,b) => {
                if (a.name > b.name ) return 1
                if (a.name < b.name ) return -1
                else return 0    
              }) :   
            state.recipes.sort((a,b) => {
                if (a.name > b.name ) return -1
                if (a.name < b.name ) return 1
                else return 0 
            });
            
            return {
                ...state,
                recipes: orderAlfabet
            }

          case 'SEARCH_RECIPES':

            return {
                ...state,
                recipes: action.payload
            }  
          case 'POST_RECIPES':
            return {
                ...state,
            }
           
          case 'GET_DIETS':
            
            return {
                ...state,
                diets: action.payload
            }
          
          case 'DETAIL_RECIPE':
            return {
                ...state,
                detail: action.payload
            }
        
            default:
            return state;
    }
}


export default rootReducer;