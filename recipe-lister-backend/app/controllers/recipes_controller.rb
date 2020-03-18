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

    def show
        recipe = Recipe.all.find_by(id: params[:id])
        render json: recipe
    end

    def update
        recipe = Recipe.all.find_by(id: params[:id])
        recipe.update(name: params['name'])
        render json: recipe
    end

    def destroy
        recipe = Recipe.all.find_by(id: params[:id])
        recipe.destroy
    end

end
