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

let recipeAdapter = new RecipesAdapter("http://localhost:3000/recipes");
recipeAdapter.fetchRecipes();

let ingredientAdapter = new IngredientsAdapter("http://localhost:3000/ingredients");
ingredientAdapter.fetchIngredients();

// function renderAllRecipes(){
//     Recipe.all.forEach(recipe => {
//         let h = document.createElement('H1');
//         h.innerText = `${recipe.name}`
//         document.getElementById('main').appendChild(h);
//     })
// }

function renderAllIngredients(){
    Ingredient.all.forEach(ingredient => {
      ingredient.fullRender();
    })
}

function formListener() {
    let counter = 0;
    document.querySelector("#add-another-ingredient").addEventListener("click", (event) => {
        event.preventDefault();
        let ingredientInput = document.querySelector("#ingredients-input");
        let div = document.createElement('div');
        div.id = `ingredient-input-${++counter}`

        div.innerHTML = `
        <input
            type="text"
            name="name"
            value=""
            placeholder="Ingredient Name..."
            class="input-text"
        />
        <input
            type="text"
            name="amount"
            value=""
            placeholder="Amount"
            class="input-text"
        />
        <br />
        `
        
        ingredientInput.appendChild(div);
    })
}