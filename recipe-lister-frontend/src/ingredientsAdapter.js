class IngredientsAdapter {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    fetchIngredients() {
        fetch(this.baseURL)
        .then(res => res.json())
        .then(resObj => {
          resObj.forEach(obj => {
            let sanitized = {id: obj.id, name: obj.name, amount: obj.amount, recipeId: obj.recipe_id, ...obj.attributes}
            new Ingredient(sanitized.id, sanitized.name, sanitized.amount, sanitized.recipeId)
          })
        })
        .then(() => {
          console.log(Ingredient.all)
          Ingredient.all.forEach(ingredient => ingredient.fullRender())
        })
    }

    addIngredients(recipeId) {
      let ingInputs = document.querySelector("#ingredients-input").children;
      for (let i = 0; i < ingInputs.length; i++) {
          if (ingInputs[i].children[0].value !== "" && ingInputs[i].children[1].value !== "") {
              let ingObj = { name: ingInputs[i].children[0].value, amount: ingInputs[i].children[1].value, recipeId: recipeId}
              this.newIngredient(ingObj);
          }
      }
    }

    newIngredient(ingredientObj){
      let configObj = {
        method: "POST",
        headers: {"Content-Type": "application/json", "Accepts": "application/json"},
        body: JSON.stringify(ingredientObj)
      }
      fetch(this.baseURL, configObj)
        .then(res => res.json())
        .then((resObj) => {
          console.log(resObj)
          this.sanitizeAndAddIngredient(resObj)
        })
    }
    
    sanitizeAndAddIngredient(ingredientObj){
      let ingredient = new Ingredient(ingredientObj.id, ingredientObj.name, ingredientObj.amount, ingredientObj.recipe_id);
      ingredient.fullRender();
      console.log("New ingredient created")
    }
}