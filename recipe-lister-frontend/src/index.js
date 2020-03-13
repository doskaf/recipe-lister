let ingredientAdapter = new IngredientsAdapter("http://localhost:3000/ingredients");
ingredientAdapter.fetchIngredients();

let recipeAdapter = new RecipesAdapter("http://localhost:3000/recipes");
recipeAdapter.fetchRecipes();

const main = document.getElementById('main')

document.getElementById("add-recipe-button").addEventListener("click", function() {
    console.log("Add Recipe")
})