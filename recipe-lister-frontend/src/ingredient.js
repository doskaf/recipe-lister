class Ingredient {

    static all = [];
    
    constructor(id, name, amount, recipeId) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.recipeId = recipeId;

        Ingredient.all.push(this);
    }
}