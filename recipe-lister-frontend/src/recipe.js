class Recipe {

    static all = [];

    constructor(id, name) {
        this.id = id;
        this.name = name;

        this.div = document.createElement('div');
        this.div.className = "recipe";
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
        <h3>${this.name}</h3>
        <button class="add-to-list-button">Add to Shopping List</button><br />
        <ul></ul><br />
        <button class="edit-recipe-button">Edit</button><br />
        <button class="delete-recipe-button">Delete Recipe</button>
        `
        main.appendChild(this.div);

        // if (this.ingredients() !== []) {
        //     this.ingredients().forEach(ingredient => {
        //         let li = document.createElement('LI');
        //         li.innerText = `${ingredient.name} | ${ingredient.amount}`;
        //         this.div.children[3].appendChild(li)
        //     }, this)
        // }
    }
}