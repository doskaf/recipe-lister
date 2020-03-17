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
          let recipeObj = {name: recipeName};
          this.newRecipe(recipeObj);
      }
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
      recipe.fullRender();
      let ingredientAdapter = new IngredientsAdapter("http://localhost:3000/ingredients");
      ingredientAdapter.addIngredients(recipe.id);
      console.log("About to Render")
    }

    deleteRecipe(recipe) {
      let ingredientAdapter = new IngredientsAdapter("http://localhost:3000/ingredients");

      recipe.ingredients().forEach(ingredient => {
        ingredientAdapter.deleteIngredient(ingredient);
      })

      fetch(this.baseURL + `/${recipe.id}`, {
        method: 'DELETE',
      })
      .then()
      .then((json) => {
        console.log(json)
        recipe.div.remove();
      })
    }

  }