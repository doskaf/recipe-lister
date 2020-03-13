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
        .then(() => console.log(Recipe.all))
    }
  }