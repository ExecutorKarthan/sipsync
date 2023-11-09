var cocktailIDs = new Map();
var mealIDs = new Map();
var drinkToMealVal = [["Vodka", "Seafood"], ["Gin", "Lamb"], ["Whiskey", "Beef"], ["Brandy", "Dessert"]]
var drinkToMealMap = new Map(drinkToMealVal);
var mealToDrinkVal = [["Seafood", "Vodka"], ["Lamb", "Gin"], ["Beef", "Whiskey"], ["Dessert", "Brandy"]]
var mealToDrinkMap = new Map(mealToDrinkVal);
var categoryVal = [["Party Drink", true], ["Shot", true], ["Cocktail", true], ["Ordinary Drink", true]]
var categoryMap = new Map(categoryVal);
var halt = false;

function getCocktailOptions(selectedIngredient, selectedDrinkCategory, selectedMealParing){
    var cocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + selectedIngredient;
    if(selectedDrinkCategory != ""){
        cocktailURL = cocktailURL + "&c=" + selectedDrinkCategory;
    }
    fetch(cocktailURL)
    .then(function (response){
        return response.json()
    }).then(function (data){
        maxVal = data.drinks.length
        if(maxVal > 5){
            maxVal = 5;
        }
        for(var i = 0; i < maxVal; i++){
            cocktailIDs.set(data.drinks[i].strDrink, data.drinks[i].idDrink);
        }
        if(!halt){
            halt = true
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

var search = document.getElementById("search")
search.addEventListener("click", function (){
    var selectedItem = "";
    var selectedDrinkCategory ="";
    var buttonComplex = document.getElementById("radioContainer").children.length
    for(var i= 0; i< buttonComplex-1; i++){   
        var inputBox = document.getElementById("radio"+(i+1).toString()).parentNode.children
        if(inputBox[0].checked && drinkToMealMap.has(inputBox[1].innerHTML)){
            selectedItem = inputBox[1].innerHTML
        }
        if(inputBox[0].checked && categoryMap.has(inputBox[1].innerHTML)){
            selectedDrinkCategory = inputBox[1].innerHTML
        }
    };
    if(drinkToMealMap.has(selectedItem)){
        getCocktailOptions(selectedItem, selectedDrinkCategory, drinkToMealMap.get(selectedItem));
    }
    if(mealToDrinkMap.has(selectedItem)){
        getMealList(selectedItem, mealToDrinkMap.get(selectedItem));
    }
    else{
        console.log("Nothing selected")
    }
    halt = false;
})

// Function for save button that puts it to local storage
function saveMyCombo() {
    var savedDrink = document.getElementById("").value;
    var savedFood = document.getElementById("").value;
    var savedPairing = savedFood + " - " + savedDrink;

    localStorage.setItem("savedPairing", savedPairing);
    window.location.href = "./saved-combos.html";
}

// Function that looks for page load, then pulls from local storage, and puts that into a list on the page
document.addEventListener("DOMContentLoaded", function() {
    var savedPairing = localStorage.getItem("savedPairing");
    if (savedPairing) {
        var savedComboList = document.getElementById("savedComboList");
        var listItem = document.createElement("li");
        listItem.appendChild(document.createTextNode(savedPairing));
        savedComboList.appendChild(listItem);
    } else {
        var savedComboList = document.getElementById("savedComboList");
        var noneListItem = document.createElement("li");
        noneListItem.appendChild(document.createTextNode("No saved combos!"));
        savedComboList.appendChild(noneListItem);
    }
});

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
    window.location.href = "./index.html";
}


