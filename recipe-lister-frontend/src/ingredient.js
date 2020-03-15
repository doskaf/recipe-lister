class Ingredient {

    static all = [];
    
    constructor(id, name, amount, recipeId) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.recipeId = recipeId;

        Ingredient.all.push(this);
    }

    recipe() {
        Recipe.all.find(e => e.id === this.recipeId)
    }

    fullRender() {
        let li = document.createElement('LI');
        let ul = this.recipe.div.children[2];
        li.innerText = `${this.name} | ${this.amount}`;
        ul.appendChild(li);
    }
}