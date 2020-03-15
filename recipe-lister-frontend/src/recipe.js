class Recipe {

    static all = [];

    constructor(id, name) {
        this.id = id;
        this.name = name;

        this.element = document.createElement('div');
        this.element.className = "recipe";
        this.element.id = `recipe-${this.id}`;

        Recipe.all.push(this);
    }
}