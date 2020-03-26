class RecipesAdapter{
    constructor(baseURL) {
      this.baseURL = baseURL;
    }
  
    fetchRecipes() {
      fetch(this.baseURL)
        .then(res => res.json())
        .then(resObj => {
          resObj.forEach(obj => {
            let sanitized = {id: obj.id, name: obj.name, ...obj.attributes}
            new Recipe(sanitized.id, sanitized.name)
          })
        })
        .then(() => {
          console.log(Recipe.all)
          Recipe.all.forEach(recipe => recipe.fullRender())
          let ingredientAdapter = new IngredientsAdapter("http://localhost:3000/ingredients");
          ingredientAdapter.fetchIngredients()
        })
    }

    addRecipe() {
      let recipeName = document.querySelector("#recipe-name-input").value;
      if (recipeName !== "") {
          let recipeObj = {name: recipeName, ingredients_attributes: this.makeIngredientObjects()}
          this.newRecipe(recipeObj);
      }
    }

    makeIngredientObjects() {
      let ingInputs = document.querySelector("#ingredients-input").children;
      let ingredients = []
      for (let i = 0; i < ingInputs.length; i++) {
          if (ingInputs[i].children[0].value !== "" && ingInputs[i].children[1].value !== "") {
              let ingObj = { name: ingInputs[i].children[0].value, amount: ingInputs[i].children[1].value }
              ingredients.push(ingObj)
          }
      }
      return ingredients
    }

    newRecipe(recipeObj){
      let configObj = {
        method: "POST",
        headers: {"Content-Type": "application/json", "Accepts": "application/json"},
        body: JSON.stringify(recipeObj)
      }
      fetch(this.baseURL, configObj)
        .then(res => res.json())
        .then((resObj) => {
          console.log(resObj);
          this.sanitizeAndAddRecipe(resObj)
        })
    }
    
    sanitizeAndAddRecipe(recipeObj){
      let recipe = new Recipe(recipeObj.id, recipeObj.name);
      recipeObj.ingredients.forEach(ingredientObj => {
        new Ingredient(ingredientObj.id, ingredientObj.name, ingredientObj.amount, ingredientObj.recipe_id)
      })
      recipe.fullRender();
      this.resetForm();
    }

    resetForm() {
      let form = document.querySelector(".add-recipe-form");
      form.style.display = "none";
      form.children[1].value = "";
      document.querySelector("#ingredient-input-0").children[0].value == "";
      document.querySelector("#ingredient-input-0").children[1].value == "";
      for (let i = 1; i < form.children[3].children.length; i++) {
          form.children[3].children[i].remove();
      }
    }

    editRecipe(recipe) {
      recipe.div.children[5].innerText = "Confirm Changes";

      let editName = document.createElement('INPUT');
      editName.setAttribute('type', 'text');
      editName.setAttribute('value', `${recipe.name}`);
      editName.setAttribute('class', 'edit-recipe-name')

      recipe.div.replaceChild(editName, recipe.div.children[1]);

      for (let i = 0; i < recipe.div.children[3].children.length; i++) {
        let ingName = recipe.div.children[3].children[i].innerText.split(" | ")[0];
        let ingAmount = recipe.div.children[3].children[i].innerText.split(" | ")[1];
        let ingId = parseInt(recipe.div.children[3].children[i].id.split("ingredient-")[1])

        let editIngr = document.createElement('div');

        editIngr.id = `edit-ingredient-${ingId}`
        editIngr.innerHTML = `
        <input
            type="text"
            value="${ingName}"
            class="input-text"
        />
        <input
            type="text"
            value="${ingAmount}"
            class="input-text"
        />
        <button class="delete-ingredient">x</button>
        <br />
        `

        recipe.div.children[3].children[i].replaceWith(editIngr)
        recipe.div.children[3].children[i].children[2].addEventListener("click", function(event) {
          event.preventDefault();
          let ingredientAdapter = new IngredientsAdapter("http://localhost:3000/ingredients");
          ingredientAdapter.deleteIngredient(Ingredient.all.find(e => e.id === ingId));
        })
      }
    }

    updateIngredientObjects(recipe) {
      let ingredients = []
      for (let i = 0; i < recipe.div.children[3].children.length; i++) {

        let newIngName = recipe.div.children[3].children[i].children[0].value;
        let newIngAmount = recipe.div.children[3].children[i].children[1].value;
        let ingId = parseInt(recipe.div.children[3].children[i].id.split("edit-ingredient-")[1]);

        let ingObj = {id: ingId, name: newIngName, amount: newIngAmount}
        ingredients.push(ingObj);
      }
      return ingredients
    }

    updateRecipe(recipe) {
      let newName = recipe.div.children[1].value;

      let configObj = {
        method: "PATCH",
        headers: {"Content-Type": "application/json", "Accepts": "application/json"},
        body: JSON.stringify({name: newName, ingredients_attributes: this.updateIngredientObjects(recipe)})
      }
      fetch(this.baseURL + `/${recipe.id}`, configObj)
      .then(res => res.json())
      .then((resObj) => {
        console.log(resObj);
        recipe.name = resObj.name;
        recipe.ingredients().forEach(ingredient => {
          let ingrObj = resObj.ingredients.find(e => e.id === ingredient.id);
          ingredient.name = ingrObj.name;
          ingredient.amount = ingrObj.amount;
        })
        recipe.fullRender();
      })
    }

    deleteRecipe(recipe) {
      fetch(this.baseURL + `/${recipe.id}`, {
        method: 'DELETE',
      })
      .then()
      .then((json) => {
        console.log(json)
        recipe.div.remove();
      })
    }

    addToList(recipe) {
      const shoppingList = document.querySelector("#shopping-list");
      let ingredientsDiv = shoppingList.children[0];

      let ingredientsOnList = []
      for (let i = 0; i < ingredientsDiv.children.length; i++) {
        ingredientsOnList.push(ingredientsDiv.children[i].children[i].innerText)
      }

      recipe.ingredients().forEach(ingredient => {
        if (!ingredientsOnList.includes(ingredient.name)) {
          let ingrElement = document.createElement('div');
          ingrElement.innerHTML = `
            <input type="checkbox">
            <label>${ingredient.name}</label>
            <button>x</button>
            <br>
          `
          ingrElement.children[2].addEventListener("click", () => {
            ingrElement.remove();
          })

          ingredientsDiv.appendChild(ingrElement);
        }
      })
    }

  }