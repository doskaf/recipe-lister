const recipeForm = document.querySelector(".add-recipe-form");
recipeForm.style.display = "none";

document.addEventListener("DOMContentLoaded", function() {
    const addBtn = document.querySelector("#add-recipe-button");
    addBtn.addEventListener("click", function() {
        if (recipeForm.style.display === "none") {
          recipeForm.style.display = "block";
        } else {
          recipeForm.style.display = "none";
        }
    });
    formListener();
})

let ingredientAdapter = new IngredientsAdapter("http://localhost:3000/ingredients");
ingredientAdapter.fetchIngredients();

let recipeAdapter = new RecipesAdapter("http://localhost:3000/recipes");
recipeAdapter.fetchRecipes();

const main = document.getElementById('main')

function formListener() {
    document.querySelector("add-another-ingredient").addEventListener("click", () => {
        let ingredientInput = document.querySelector("#ingredients-input");
        let input = document.createElement("INPUT");
        input.setAttribute("type", "text");
        input.setAttribute("name", "ingredient");
        input.setAttribute("value", "");
        input.setAttribute("placeholder", "Add an ingredient");
        input.setAttribute("class", "input-text");
        ingredientInput.appendChild(input);
    })
}