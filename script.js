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


// Home button function on the saved-combos HTML
document.getElementById("#homeButton").addEventListener("click", function() {
    window.location.href = "PATH TO HOME PAGE";
});