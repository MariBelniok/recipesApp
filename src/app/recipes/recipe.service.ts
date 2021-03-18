import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()

export class RecipeService{
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            'Salad', 
            'The best salad ever', 
            'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80',
            [
                new Ingredient('Tomato', 2),
                new Ingredient('Avocado', 1/2)
            ]),
        new Recipe(
            'Pasta', 
            'The tastiest pasta', 
            'https://images.unsplash.com/photo-1576402187878-974f70c890a5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=890&q=80',
            [
                new Ingredient('Pasta', 1),
                new Ingredient('Sauce', 1)
            ])
    ];

    constructor(private slService: ShoppingListService){}

    getRecipes(){
        return this.recipes.slice();
    }

    addIngredientsToShopList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
    }
}