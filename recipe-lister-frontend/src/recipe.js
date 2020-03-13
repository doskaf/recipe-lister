class Recipe {

    static all = [];

    constructor(id, name) {
        this.id = id;
        this.name = name;

        Recipe.all.push(this);
    }
}