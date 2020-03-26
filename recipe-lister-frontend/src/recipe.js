class Recipe {

    static all = [];

    constructor(id, name) {
        this.id = id;
        this.name = name;

        this.div = document.createElement('div');
        this.div.className = "card col-md-3";
        this.div.id = `recipe-${this.id}`;

        Recipe.all.push(this);
    }

    ingredients() {
        return Ingredient.all.filter(function(ingredient){
            return ingredient.recipeId === this.id
        }, this)
    }

    fullRender() {
        let main = document.querySelector("#main");
        this.div.innerHTML = `
        <h3 class="recipe-header">${this.name}</h3>
        <button class="add-to-list-button" data-toggle="modal" data-target="#myModal">Add to Shopping List</button><br />
        <ul></ul><br />
        <button class="edit-recipe-button">Edit</button><br />
        <button class="delete-recipe-button">Delete Recipe</button>
        `
        main.appendChild(this.div);

        let recipe = this;

        let addToListBtn = this.div.children[1];
        let editBtn = this.div.children[5];
        let deleteBtn = this.div.children[7];

        let recipeAdapter = new RecipesAdapter("http://localhost:3000/recipes")

        addToListBtn.addEventListener("click", function(event) {
            event.preventDefault();
            recipeAdapter.addToList(recipe)
        })
        editBtn.addEventListener("click", function(event) {
            event.preventDefault();
            if (this.innerText === "Edit") {
                recipeAdapter.editRecipe(recipe)
            } else {
                recipeAdapter.updateRecipe(recipe)
            }
        })
        deleteBtn.addEventListener("click", function(event) {
            event.preventDefault();
            recipeAdapter.deleteRecipe(recipe)
        })

        
        if (this.ingredients() !== null) {
            this.ingredients().forEach(ingredient => {
                ingredient.fullRender();
            })
        }
    }
}