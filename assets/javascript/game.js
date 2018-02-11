//  ====================================< global variables >================================= //    
var counter = 0;
var gameRandomNbr = 0;
var playerScore = 0;
var playerWins = 0;
var playerLosses = 0;
var gameWon = "false";
var gameLost = "false";

//  ====================================< functions >======================================== //

function newGame() {
    counter = 0;
    $("#player-score").text(counter);

    $("#player-wins").text(playerWins);
    $("#player-losses").text(playerLosses);

    // gameRandomNbr creates a random number that is between the values of 19 - 120. 
    gameRandomNbr = Math.floor(Math.random() * (120 - 19 + 1) + 19);
    $("#game-nbr").text(gameRandomNbr);

    imageArray = [
        'https://cdn1.iconfinder.com/data/icons/crystal-1/60/red_crystal-512.png',
        'https://cdn1.iconfinder.com/data/icons/crystal-1/60/blue_crystal-512.png',
        'https://cdn1.iconfinder.com/data/icons/crystal-1/60/yellow_crystal-512.png',
        'https://cdn1.iconfinder.com/data/icons/crystal-1/60/metal_crystal-512.png'
    ]

    $("img").remove();

    // The below for-loop creates (4) crystal images within the class=crystals div. 
    // Each crystal-image has a data attribute that contains a random number between 1 - 12.  
    for (var i = 0; i < 4; i++) {

        var crystalRandomNbr = (Math.floor(Math.random() * 12) + 1);

        var imageCrystal = $("<img>");
        imageCrystal.attr("class", "crystal-image");
        imageCrystal.attr("src", imageArray[i]);
        imageCrystal.attr("data-crystalvalue", crystalRandomNbr);

        $("#crystals").append(imageCrystal);
    }
}

//  ====================================< main process >===================================== // 

$(document).ready(function () {

    newGame();

    // Clicking on a crystal image adds the image's data-crystalvalue points to the player's counter. 
    $(document).on('click', ".crystal-image", function () {
        
        if (gameWon === "true") {
            $("#win-loss-msg").empty();
            gameWon = "false";
        }
        else if (gameLost === "true") {
            $("#win-loss-msg").empty();
            gameLost = "false";
        }

        var crystalValue = ($(this).attr("data-crystalvalue"));

        // Converting the "data-crystalValue" attribute from a string to an integer value. 
        crystalValue = parseInt(crystalValue);

        // Every click, from any crystal adds to the global counter.
        counter += crystalValue;

        if (counter === gameRandomNbr) {
            $("#win-loss-msg").text("You Won!");
            gameWon = "true";
            playerWins++;
            newGame();
        }
        else if (counter >= gameRandomNbr) {
            $("#win-loss-msg").text("You Lost!");
            gameLost = "true";
            playerLosses++;
            newGame();
        }

        $("#player-score").text(counter);
    });
});
