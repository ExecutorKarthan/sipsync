//Create reference maps for fast data retrieval 
var cocktailIDs = new Map();
var mealIDs = new Map();
var drinkToMealVal = [["Vodka", "Seafood"], ["Gin", "Lamb"], ["Whiskey", "Beef"], ["Brandy", "Dessert"]]
var drinkToMealMap = new Map(drinkToMealVal);
var mealToDrinkVal = [["Seafood", "Vodka"], ["Lamb", "Gin"], ["Beef", "Whiskey"], ["Dessert", "Brandy"]]
var mealToDrinkMap = new Map(mealToDrinkVal);
var categoryVal = [["Homemade Liqueur", true], ["Shot", true], ["Cocktail", true], ["Ordinary Drink", true]]
var categoryMap = new Map(categoryVal);

//Create a halt variable to prevent infinite looping
var halt = false;

//Create a function retrieve cocktail data
function getCocktailOptions(selectedIngredient, selectedDrinkCategory, selectedMealParing){
    //Build a cocktail url based on selected ingredients and possibly category
    var cocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + selectedIngredient;
    if(selectedDrinkCategory != ""){
        cocktailURL = cocktailURL + "&c=" + selectedDrinkCategory;
    }
    //Query the website to get the needed cocktail data
    fetch(cocktailURL)
    .then(function (response){
        return response.json()
    }).then(function (data){
        //Determine the maximum length of items returned. If that value is larger than 5, set it to five. If not, only display what is present.
        maxVal = data.drinks.length
        var drinkButtonContainer = document.querySelector("#drinkResults").children
        if(maxVal > 5){
            maxVal = 5;
        }
        //Set the buttons for the drinks to visible and write out the names
        for(var i = 0; i < maxVal; i++){
            cocktailIDs.set(data.drinks[i].strDrink, data.drinks[i].idDrink);
            drinkButtonContainer[i].children[0].classList.remove("invisible")
            drinkButtonContainer[i].children[0].innerHTML = data.drinks[i].strDrink;
        }
        //Flag the halt to true so it will not infinitely loop then call the meal function for the meal pairings
        if(!halt){
            halt = true
            getMealList(selectedMealParing);
        }
    })
}

//Create a function to retrieve meal data
function getMealList(mealCategory, drinkPairing, selectedDrinkCategory){
    //Build the url to search for meals
    var mealURL = "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + mealCategory;
    //Query the website to ge the needed cocktail data
    fetch(mealURL)
    .then(function (response){
        return response.json();
    }).then(function (data){
        //Determine the maximum length of items returned. If that value is larger than 5, set it to five. If not, only display what is present.
        maxVal = data.meals.length
        var foodButtonContainer = document.querySelector("#foodResults").children
        if(maxVal > 5){
            maxVal = 5;
        }
        //Set the buttons for the meals to visible and write out the names
        for(var i = 0; i < maxVal; i++){
            mealIDs.set(data.meals[i].strMeal, data.meals[i].idMeal);
            foodButtonContainer[i].children[0].classList.remove("invisible")
            foodButtonContainer[i].children[0].innerHTML = data.meals[i].strMeal;
        }
        //Flag the halt to true so it will not infinitely loop then call the drink function for the meal pairings
        if(!halt){
            halt = true
            getCocktailOptions(drinkPairing, selectedDrinkCategory);
        }
    })
}

//Locate the search button 
var search = document.getElementById("search")

//Run the main function on click of the search button
search.addEventListener("click", function (){
    var selectedItem = "";
    var selectedDrinkCategory ="";
    //Get a list of all radio buttons to test for true and to get their text values
    var buttonComplex = document.getElementById("radioContainer").children.length
    //Loop through the radio button list. If the value is true (checked) then take the text and store it as a variable, as well as reset the button
    for(var i= 0; i< buttonComplex; i++){   
        var inputBox = document.getElementById("radio"+(i+1).toString()).parentNode.children
        if(inputBox[0].checked && drinkToMealMap.has(inputBox[1].innerHTML)){
            selectedItem = inputBox[1].innerHTML
            inputBox[0].checked = false;
        }
        if(inputBox[0].checked && categoryMap.has(inputBox[1].innerHTML)){
            selectedDrinkCategory = inputBox[1].innerHTML
            inputBox[0].checked = false;
        }
        if(inputBox[0].checked && mealToDrinkMap.has(inputBox[1].innerHTML)){
            selectedItem = inputBox[1].innerHTML
            inputBox[0].checked = false;
        }
    };
    //Call the appropriate function to get the cocktail or meal based on previous input
    if(drinkToMealMap.has(selectedItem)){
        getCocktailOptions(selectedItem, selectedDrinkCategory, drinkToMealMap.get(selectedItem));
    }
    if(mealToDrinkMap.has(selectedItem)){
        getMealList(selectedItem, mealToDrinkMap.get(selectedItem), selectedDrinkCategory);
    }
    else{
        console.log("Nothing selected")
    }
    //Reset the halt value so the next submission can be done
    halt = false;
})

// Function for save button that puts it to local storage
function saveMyCombo() {
    var savedDrink = document.querySelector('input[name="radio-group"]:checked + span').innerText;
    var savedDrinkType = document.querySelector('input[name="radio-group2"]:checked + span').innerText;
    var savedFood
    var savedPairing = savedDrinkType + " of " + savedDrink + " | " + savedFood;
    var existingSavedPairings = localStorage.getItem("savedPairings");

    // If there are no existing saved combinations, create an empty array
    if (!existingSavedPairings) {
        existingSavedPairings = [];
    } else {
        existingSavedPairings = JSON.parse(existingSavedPairings);
    }
    // Add the new combination to the list of saved combinations
    existingSavedPairings.push(savedPairing);
    // Store the updated list back in local storage
    localStorage.setItem("savedPairings", JSON.stringify(existingSavedPairings));

    resetChoices();
}


// Function that looks for page load, retrieves saved combinations from local storage, and displays them in a list
document.addEventListener("DOMContentLoaded", function() {
    var savedPairings = localStorage.getItem("savedPairings");
    var savedComboList = document.getElementById("savedComboList");


    if (savedPairings) {
        var pairings = JSON.parse(savedPairings);
        pairings.forEach(function (pairing) {
            var listItem = document.createElement("li");
            listItem.appendChild(document.createTextNode(pairing));
            savedComboList.appendChild(listItem);
        });
    } else {
        var listItem = document.createElement("li");
        listItem.appendChild(document.createTextNode("No saved combos!"));
        savedComboList.appendChild(listItem);
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