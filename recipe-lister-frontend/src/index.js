const recipeForm = document.querySelector(".add-recipe-form");
recipeForm.style.display = "none";

document.addEventListener("DOMContentLoaded", function() {
    const addBtn = document.querySelector("#add-recipe-button");
    addBtn.addEventListener("click", function() {
        if (recipeForm.style.display === "none") {
          recipeForm.style.display = "block";
          formListener();
        } else {
          recipeForm.style.display = "none";
        }
    });
})

let ingredientAdapter = new IngredientsAdapter("http://localhost:3000/ingredients");
ingredientAdapter.fetchIngredients();

let recipeAdapter = new RecipesAdapter("http://localhost:3000/recipes");
recipeAdapter.fetchRecipes();

const main = document.getElementById('main')

function formListener() {
    let counter = 0;
    document.querySelector("#add-another-ingredient").addEventListener("click", (event) => {
        event.preventDefault();
        let ingredientInput = document.querySelector("#ingredients-input");
        let div = document.createElement('div');
        div.id = "ingredient-input-" + `${++counter}`

        let nameInput = document.createElement("INPUT");
        nameInput.setAttribute("type", "text");
        nameInput.setAttribute("name", "name");
        nameInput.setAttribute("value", "");
        nameInput.setAttribute("placeholder", "Ingredient Name...");
        nameInput.setAttribute("class", "input-text");

        let amountInput = document.createElement("INPUT");
        amountInput.setAttribute("type", "text");
        amountInput.setAttribute("name", "amount");
        amountInput.setAttribute("value", "");
        amountInput.setAttribute("placeholder", "Amount...");
        amountInput.setAttribute("class", "input-text");

        let br = document.createElement('BR');
        div.appendChild(nameInput);
        div.appendChild(amountInput);
        div.appendChild(br);
        ingredientInput.appendChild(div);
    })
}