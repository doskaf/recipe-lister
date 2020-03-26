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

    deleteIngredient(ingredient) {
      fetch(this.baseURL + `/${ingredient.id}`, {
        method: 'DELETE',
      })
      .then()
      .then((json) => {
        console.log(json)
        ingredient.li.remove()
      })
    }
}