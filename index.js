const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
      let newRecipe = { title: 'arroz com feijao', cuisine: 'Brazilian', duration: '1' };
    
        Recipe.create(newRecipe)
          .then((recipeCreated) => console.log(recipeCreated))
          .catch((err) => console.log(err));
          }
    )
    
    /* Recipe.insertMany({}, { : })
      .then((updateInformation) => console.log(updateInformation))
       .catch((err) => console.log(err));
   */
.then(() => {
  function addAll(data) {
    Recipe.insertMany(data)
    .then((recipes)=>
    recipes.forEach((recipe)=>{
      console.log(recipe.title);
    })
    )
    .catch((err)=> console.log(err));
  }
  addAll(data);
  
})

.then((recipe=> {
 let update = Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
 console.log('The recipe has been updated')
 return update;
}))

.then(recipe=>{
  const cakeDelete = Recipe.deleteOne({title: "Carrot Cake"},)
  console.log('the recipe has been delete')
  return cakeDelete
   }) 
   .then(()=>{
   return  mongoose.connection.close()
   }
   )

.catch(error => {
console.error('Error connecting to upadate', error);
