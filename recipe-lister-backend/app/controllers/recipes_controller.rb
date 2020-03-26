class RecipesController < ApplicationController

    def index
        recipes = Recipe.all
        render json: recipes
    end

    def create
        recipe = Recipe.new(params.permit(:name, ingredients_attributes: [:name, :amount]))
        if recipe.save
            render json: recipe, :include => :ingredients
        else
            render json: { errors: recipe.errors.full_messages }
        end
    end

    def show
        recipe = Recipe.all.find_by(id: params[:id])
        render json: recipe, :include => :ingredients
    end

    def update
        recipe = Recipe.all.find_by(id: params[:id])
        recipe.update(params.permit(:name, ingredients_attributes: [:id, :name, :amount]))
        render json: recipe, :include => :ingredients
    end

    def destroy
        recipe = Recipe.all.find_by(id: params[:id])
        recipe.ingredients.each {|i| i.destroy}
        recipe.destroy
    end

end
