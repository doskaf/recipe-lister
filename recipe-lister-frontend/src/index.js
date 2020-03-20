const recipeForm = document.querySelector(".add-recipe-form");
recipeForm.style.display = "none";
const shoppingList = document.querySelector("#shopping-list");
// shoppingList.style.display = "none";

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
    document.querySelector("#add-ingredient-to-list").addEventListener("click", () => {
        if (shoppingList.children.length === 3) {
            addIngredientToShoppingListForm(shoppingList);
        } else {
            addIngredientToShoppingList(shoppingList);
        }
    })
    let newRecipeBtn = document.querySelector("#create-recipe-button");
    newRecipeBtn.addEventListener("click", function(event) {
        event.preventDefault();
        recipeAdapter.addRecipe();
    });
})

let recipeAdapter = new RecipesAdapter("http://localhost:3000/recipes");
recipeAdapter.fetchRecipes();

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

function addIngredientToShoppingListForm(shoppingList) {
    let ingredientForm = document.createElement('INPUT');
    ingredientForm.setAttribute('type', 'text');
    ingredientForm.setAttribute('value', '');
    ingredientForm.setAttribute('placeholder', 'Ingredient Name...');
    ingredientForm.setAttribute('class', 'input-text');
    shoppingList.appendChild(ingredientForm)
}

function addIngredientToShoppingList(shoppingList) {
    let ingrName = shoppingList.children[3].value

    let ingrElement = document.createElement('div');
    ingrElement.innerHTML = `
      <input type="checkbox">
      <label>${ingrName}</label>
      <button>x</button>
      <br>
    `
    ingrElement.children[2].addEventListener("click", () => {
        ingrElement.remove();
      })
    shoppingList.children[0].appendChild(ingrElement);
    shoppingList.children[3].remove();
}