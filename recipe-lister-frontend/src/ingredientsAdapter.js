class IngredientsAdapter {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    fetchIngredients() {
        fetch(this.baseURL)
        .then(res => res.json())
        .then(resObj => {
          resObj.data.forEach(ingredientObj => {
            let sanitized = {...ingredientObj.attributes, id: ingredientObj.id, recipeId: ingredientObj.relationships.recipe.data.id}
            new Ingredient(sanitized.id, sanitized.name, sanitized.amount, sanitized.recipeId)
          })
        })
        .then(() => console.log(Ingredient.all))
    }
}