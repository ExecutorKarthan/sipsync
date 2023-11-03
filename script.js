function getCocktailOptions(){
    var selectedIngredient = document.querySelector("ingredientSelected").value;
    var selectedCategory = document.querySelector("selectedCategory").value;
    var cocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + selectedIngredient;
    if(selectedCategory != None){
        cocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + selectedIngredient + "&c=" + selectedCategory;
    }
    fetch(cocktailURL)
    .then(function (response){
        return response.json();
    }).then(function (data){
        for(var i = 0; index < 5; i++){
            /*Assign values to the box(s)*/
            
        }
    })
}

function getDrinkID(name){

}


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
}