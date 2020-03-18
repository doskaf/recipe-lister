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
    let newRecipeBtn = document.querySelector("#create-recipe-button");
    newRecipeBtn.addEventListener("click", function(event) {
        event.preventDefault();
        recipeAdapter.addRecipe();
        resetForm(recipeForm);
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

function resetForm(form) {
    form.style.display = "none";
    form.children[1].value = "";
    for (let i = 0; i < form.children[3].children.length; i++) {
        form.children[3].children[i].children[0].value = "";
        form.children[3].children[i].children[1].value = "";
    }
}