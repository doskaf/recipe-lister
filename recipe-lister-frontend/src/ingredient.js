class Ingredient {

    static all = [];
    
    constructor(id, name, amount, recipeId) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.recipeId = recipe.id;

        Ingredient.all.push(this);
    }
}