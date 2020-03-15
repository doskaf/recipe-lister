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
        return Recipe.all.find(e => e.id === this.recipeId)
    }

    fullRender() {
        let ul = document.querySelector(`#recipe-${this.recipeId}`).children[3]
        let li = document.createElement('LI');
        li.innerText = `${this.name} | ${this.amount}`;
        ul.appendChild(li);
    }
}