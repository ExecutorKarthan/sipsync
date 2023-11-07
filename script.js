var cocktailIDs = new Map();
var mealIDs = new Map();
var drinkToMealVal = [["Vodka", "Seafood"], ["Gin", "Lamb"], ["Whiskey", "Beef"], ["Brandy", "Dessert"]]
var drinkToMealMap = new Map(drinkToMealVal);
var mealToDrinkVal = [["Seafood", "Vodka"], ["Lamb", "Gin"], ["Beef", "Whiskey"], ["Dessert", "Brandy"]]
var mealToDrinkMap = new Map(mealToDrinkVal);
var halt = false;

function getCocktailOptions(selectedIngredient, selectedDrinkCategory, selectedMealParing){
    var cocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + selectedIngredient;
    console.log(cocktailURL)
    console.log(selectedDrinkCategory)
    if(selectedDrinkCategory != null){
        cocktailURL = cocktailURL + "&c=" + selectedDrinkCategory;
    }
    console.log(selectedDrinkCategory)
    fetch(cocktailURL)
    .then(function (response){
        return response.json();
    }).then(function (data){
        console.log(data.drinks[1])
        for(var i = 0; i < 5; i++){
            console.log(data.drinks[i].strDrink + "  and  " + data.drinks[i].idDrink)
            cocktailIDs.set(data.drinks[i].strDrink, data.drinks[i].idDrink);
            /*Assign values to the box(s)*/
        }
        if(!halt){
            halt = true
            console.log(selectedMealParing)
            getMealList(selectedMealParing);
        }
    })
}

function getMealList(mealCategory, drinkPairing){
    var mealURL = "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + mealCategory;
    fetch(mealURL)
    .then(function (response){
        return response.json();
    }).then(function (data){
        for(var i = 0; i < 5; i++){
            console.log(data.meals[i].strMeal + "  and  " + data.meals[i].idMeal)
            mealIDs.set(data.meals[i].strMeal, data.meals[i].idMeal);
            /*Assign values to the box(s)*/
        }
        if(!halt){
            halt = true
            //Get data for drink category
            var selectedDrinkCategory = "Shot"
            getCocktailOptions(drinkPairing, selectedDrinkCategory);
        }
    })
}

/*
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
*/

function test(){
    var selectedItem = "Whiskey"
    var selectedDrinkCategory = "Ordinary Drink"
    if(drinkToMealMap.has(selectedItem)){
        console.log("Drink is " + selectedItem)
        console.log("Drink map response " + drinkToMealMap.get(selectedItem))
        console.log(selectedDrinkCategory)
        getCocktailOptions(selectedItem, selectedDrinkCategory, drinkToMealMap.get(selectedItem));
    }
    else{
        getMealList(selectedItem, mealToDrinkMap.get(selectedItem));
    }
    halt = false;
}

test()



// Function for save button that puts it to local storage and then pushes to saved-combos html
function saveMyCombo() {
    
}


// Reset button function, resets to default - need to add ' onclick="resetChoices()" ' to reset button in HTML
function resetChoices() {
    location.reload();
}

// Button that takes you to saved combos - need to add ' onclick="goToSaved()" ' to Saved Pairings button in HTML
function goToSaved() {
    window.location.href = "./saved-combos.html"
}

// Home button function on the saved-combos HTML
function returnHome() {
    window.location.href = "PATH TO HOME PAGE";
};


