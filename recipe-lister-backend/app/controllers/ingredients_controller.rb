class IngredientsController < ApplicationController

    def index
        ingredients = Ingredient.all
        render json: ingredients
    end

    def create
        ingredient = Ingredient.new(name: params['name'], amount: params['amount'], recipe_id: params['recipeId'])
        if ingredient.save
            render json: ingredient
        else
            render json: { errors: ingredient.errors.full_messages }
        end
    end

end
