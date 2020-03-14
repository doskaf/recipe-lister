class RecipesController < ApplicationController

    def index
        recipes = Recipe.all
        render json: recipes
    end

    def create
        recipe = Recipe.new(name: params['name'])
        if recipe.save
            render json: recipe
        else
            render json: { errors: recipe.errors.full_messages }
        end
    end

end
