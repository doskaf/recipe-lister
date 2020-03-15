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

    fullRender() {
        this.div.innerHTML = `
        <h3>${this.name}</h3>
        <button class="add-to-list-button">Add to Shopping List</button><br />
        <ul></ul><br />
        <button class="edit-recipe-button">Edit</button><br />
        <button class="delete-recipe-button">Delete Recipe</button>
        `
    }
}