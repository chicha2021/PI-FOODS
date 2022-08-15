const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Recipe, Diet } = require('../db');
const axios = require('axios');
const {apiKey} = process.env;




const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


const allInfoApi = async () => {
    const recipeInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=100`)
    // console.log(recipeInfo.data.results[5].title)
    const mapInfo = recipeInfo.data.results.map( e => { //Averiguar por qué ingresamos al .data
        return {
            id: e.id,
            name: e.title,                         //Me traigo la info que necesito guardar en el modelo
            summary: e.summary,
            health_score: e.healthScore,
            diets: e.diets.map(e => e).join(", "),
            image: e.image,
            dishTypes: e.dishTypes 
         }
    })
    return mapInfo;
}

const allInfoDb = async () => {
    
    let recipeDb = await Recipe.findAll({
        include:{
            model:Diet,
            attributes:['name'],
            through:{
                attributes:[]
            }
        }                
    });
    recipeDb = recipeDb.map(e=>e.toJSON());
    recipeDb.map(el=>{
       el.diets = el.diets.map(e=>e.name).join(", ");
    }) 
    return recipeDb;
    
}

const allRecipes = async () => {
    let infoApi = await allInfoApi();   //Ejecuto toda la info de la api
    let infoDb = await allInfoDb();   //Ejecuto toda la info de la db
    const allInfo = infoApi.concat(infoDb); //Ejecuto ambas informaciones para que me traiga todas las recetas
    return allInfo;
}



router.get('/recipes', async (req, res) => { //En esta ruta se unifican todas las recetas pero tambien podemos utilizar el query. //Se puede unificar el query a la ruta, por funcionamiento 
    const { name } = req.query;
    try {
        let recipesTotal = await allRecipes();
        if (name) {
        let queryRecipe = await recipesTotal.filter(e =>e.name.toLowerCase().includes(name.toLowerCase()));
        queryRecipe.length ? 
        res.status(200).json(queryRecipe) :
        res.status(404).send('La receta no existe');      
        }
        else { 
        res.status(200).json(recipesTotal);
        console.log('Estoy acá')
    }
    } catch (error) {
        console.log(error)
    }
});



router.get('/diets', async (req, res)=> {
    try {
        const infoApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeInformation=true&number=100`);
        const dietApi = infoApi.data.results.map(recipe => recipe.diets)
        // console.log(dietApi.flat(2))
        const newDietsDb = dietApi.flat(2);
        const dietsDb = new Set(newDietsDb)
         
        dietsDb.forEach((el) => {
                Diet.findOrCreate({
                    where: { name: el } 
              })
            });
            // else console.log(el); //para evitar los undefined
    
    
        const allDietsDb = await Diet.findAll();
        res.status(200).send(allDietsDb);

    }   catch (error) {
        console.log(error);
    }
});

router.get('/recipes/:id', async (req, res)=> {
    const {id} = req.params
    console.log(id)
  try {
      if (String(id).length < 36) { //Verificación para saber si el id viene de la database o de la api
          const idApi = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`)
         console.log(idApi) //Aca ya tengo el objeto o la receta
          
          const infoIdApi = {
              img: idApi.data.image,
              name: idApi.data.title,
              dishType: idApi.data.dishTypes.join(", "),
              dishDiet: idApi.data.diets.join(", "),
              summary: idApi.data.summary,
              health_score: idApi.data.healthScore,
              steps: idApi.data.analyzedInstructions[0]?.steps.map(e => e.step) 
          }
          
          return res.status(200).json(infoIdApi);
      } else {
      
          let reciDb = await Recipe.findByPk(id)
          
          reciDb? res.status(200).json(reciDb) : res.status(404).send(`La receta ${id} no existe`);
  
      } 
  } catch (error) {
      console.log(error)
  }

});


router.post('/recipes', async (req, res)=> {
    let {name, summary, health_score, steps, diets} = req.body;
    if (!name || !summary || !health_score || !steps || !diets) {
        res.status(404).send('Todos los campos son obligatorios!')
     }
    try {
         //el tipo de dieta viene tambien por body
        console.log(name, summary, health_score, steps, diets)
         //Si completan el formulario
            if(typeof steps==="string") steps = [steps]
            let createRecipe = await Recipe.create({ 
             name, 
             summary, 
             health_score, 
             steps,
            });
            
            let promises = diets.map( el => Diet.findOne({where:{name:el}}));
            let idDiets = await Promise.all(promises)
            console.log(idDiets)

            // let dietDb = await Diet.findAll({ where: {name: diets }})
            createRecipe.addDiets(idDiets);
            
            res.status(200).send('Receta creada correctamente!');
            
    } catch (error) {
        console.log(error);
    }

    
});






// router.get('/recipes/:idReceta', async (req, res)=> {
//     const id = req.params.idReceta 
//     try {
//          if (id) {
//           let recipesDb = await allRecipes(); //Acá se trae todas las recetas         
//           let detailRecipe = recipesDb.filter(recipe => recipe.id === id) //Agarro el arreglo de recetas y busco por id
//           detailRecipe? res.status(200).json(detailRecipe) : res.status(404).send(`La receta ${id} no existe`);
//             }
//     } catch (error) {
//         alert(error); 
//     }});
























module.exports = router;
