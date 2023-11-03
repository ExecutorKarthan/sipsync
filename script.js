var cocktailIDs = new Map();
var mealIDs = new Map();
var drinkToMealVal = [["Vodka", "Seafood"], ["Gin", "Lamb"], ["Whiskey", "Beef"], ["Brandy", "Dessert"]]
var drinkToMealMap = new Map(drinkToMealVal);
var mealToDrinkVal = [["Seafood", "Vodka"], ["Lamb", "Gin"], ["Beef", "Whiskey"], ["Dessert", "Brandy"]]
var mealToDrinkMap = new Map(mealToDrinkVal);
var halt = false;

function getCocktailOptions(selectedIngredient, mealCategory){
    var cocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + selectedIngredient;
    if(selectedCategory != None){
        cocktailURL = cocktailURL + "&c=" + selectedCategory;
    }
    fetch(cocktailURL)
    .then(function (response){
        return response.json();
    }).then(function (data){
        for(var i = 0; index < 5; i++){
            cocktailIDs.set(data[i].strDrink, data[i].idDrink);
            /*Assign values to the box(s)*/
        }
        if(!halt){
            halt = true
            getMealList(mealCategory, selectedIngredient);
        }
    })
}

function getMealList(selectedCategory, drinkIngredient){
    var mealURL = "www.themealdb.com/api/json/v1/1/filter.php?c=" + selectedCategory;
    fetch(mealURL)
    .then(function (response){
        return response.json();
    }).then(function (data){
        for(var i = 0; index < 5; i++){
            mealIDs.set(data[i].strMeal, data[i].idMeal);
            /*Assign values to the box(s)*/
        }
        if(!halt){
            halt = true
            getCocktailOptions(drinkIngredient, selectedCategory);
        }
    })
}


document.addEventListener("selectionchange", function (event){
    var selectedItem = event.target.value
    if(drinkToMealMap.has(selectedItem)){
        getCocktailOptions(selectedItem, drinkToMealMap.get(selectedItem));
    }
    else{
        getMealList(selectedItem, mealToDrinkMap.get(selectedItem));
    }
    halt = false;
})
}


// Home button function on the saved-combos HTML
document.getElementById("#homeButton").addEventListener("click", function() {
    window.location.href = "PATH TO HOME PAGE";
});

