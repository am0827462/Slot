/*
    Name: Angela McLaughlin
    Class Section: CIS-131-W01-Fall 2020
    Date: 10/4/2020
    Description: This is a slot machine game that starts the user off with 100 point score.
    The user can select the type of reels they would like, and bet a whole number amount for
    each spin.  If two images match, the user wins 2x their bet, and if 3 match the user wins
    3x the bet.  The user can cash out at any point, in which they win the score the have.
    This is casino style where it's assumed they get to take their 'win' to a different machine.
    As soon as the score gets to zero the user cannot bet or spin any longer.

    The reels are designed where more pics can be added to make the game more challenging.
*/

//Arrays to hold reel pics
var reels = ["ready.jpg","to.jpg","play.jpg"];
var dogs = ["dog1.jpg","dog2.jpg","dog3.jpg","dog4.jpg","dog5.jpg"];
var fruits = ["cherry.jpg","orange.jpg","banana.jpg","pineapple.jpg","mango.jpg"];
var flowers = ["flower1.jpg","flower2.jpg","flower3.jpg","flower4.jpg","flower5.jpg"];
var suprises = ["homer.jpg","lisa.jpg","maggie.jpg","bart.jpg","marge.jpg"];
var currReel = [];

//Sets initial score
var score = 100;

//window load event loads initial images
window.addEventListener("load", function(){
    for (var i = 0; i < 3; i++){
        document.getElementById("reels").innerHTML += 
        "<img src="+ reels[i]+ " alt=reel"+ (i+1) + " class='reel'>";
    }
    document.getElementById("score").innerHTML = score;
    document.getElementById("message").innerHTML = "Select the reel type, enter a bet, and click Spin to play!";

});

//Add event listener to Reel Buttons
document.getElementById("fruit").addEventListener("click", fruit, false);
document.getElementById("dog").addEventListener("click", dog, false);
document.getElementById("flower").addEventListener("click", flower, false);
document.getElementById("suprise").addEventListener("click", suprise, false);

//Var for reel Div
var reelDiv = document.getElementById("reels");

//Functions to change reel pics
function fruit(){
    reelDiv.innerHTML = "";
    currReel = fruits;
    swap();
}

function dog(){
    reelDiv.innerHTML = "";
    currReel = dogs;
    swap();
}

function flower(){
    reelDiv.innerHTML = "";
    currReel = flowers;
    swap();
}

function suprise(){
    reelDiv.innerHTML = "";
    currReel = suprises;
    swap();
}

//was repeating code!  So made this function to add to the reel switch functions to 
//clean it up.
function swap(){
    for (var i = 0; i < 3; i++){
        document.getElementById("reels").innerHTML += 
        "<img src="+ currReel[i]+ " alt=reel"+ (i+1) + " class='reel'>";
    }
}

//Add event listener to Spin button
document.getElementById("Spin").addEventListener("click", validate, false);

function validate(){
    var userBet = document.getElementById("bet");  //Grabs bet entry from user
    var message = document.getElementById("message");  //Div for error message
    var regex = /^[0-9]*$/g; //Checks if only numbers entered (will not allow decimals)
    var regexError = regex.test(userBet.value);

    //Test if bet is empty
    if(userBet.value === ""){
        userBet.style.background = "rgb(255,36,0)";
        userBet.focus();
        message.innerHTML = "No bet entered!";
    }
    //Test if bet is not a number
    else if(regexError !== true){
        userBet.style.background = "rgb(255,36,0)";
        userBet.focus();
        message.innerHTML = "Please enter a valid number!";
    }
    //Test if bet is more than what's in the bank
    else if(userBet.value > score){
        userBet.style.background = "rgb(255,36,0)";
        userBet.focus();
        message.innerHTML = "That's more than you have!";
    }
    //Test if reel changed
    else if(currReel.length === 0){
        message.innerHTML = "Select a reel type!";
    }
    //Test if score is 0, will not let spin again
    else if(score === 0){
        message.innerHTML = "Game over, better luck next time!";
    }

    else{spin(userBet,message);}//if all is good, the reels spin
}

function spin(userBet,message){
    
    //Clear error background and message
    userBet.style.background = "white";
    message.innterHTML = "";
    
    //Clear existing reels
    document.getElementById("reels").innerHTML = "";

    //Replaces images with random new images from array
    for(var i = 0; i < 3; i++){
        var reel = Math.floor(Math.random() * currReel.length);
        document.getElementById("reels").innerHTML +=
        "<img src="+ currReel[reel]+ " alt=reel"+ (i+1) + " id=reel"+ (i+1) + " class='reel'>";
    }

    //Place images into variables
    var reel1 = document.getElementById("reel1").src;
    var reel2 = document.getElementById("reel2").src;
    var reel3 = document.getElementById("reel3").src;
    
    //Match three reels
    if(reel1 === reel2 && reel2 === reel3){
        score = score + (userBet.value * 3);
        message.innerHTML = "Match 3!  You win 3 times your bet!";
    }
    //Match two reels
    else if(reel1 === reel2 || reel2 === reel3 || reel1 === reel3){
        score = score + (userBet.value * 2);
        message.innerHTML = "Match 2!  You win 2 times your bet!";
    }
    //Or lose, no match
    else{
        score = score - userBet.value;
        message.innerHTML = "You lose!";
    }
    //display score
    document.getElementById("score").innerHTML = score;
    }

//Add event listener to Cash Out button
document.getElementById("cashout").addEventListener("click", cashOut, false);

//When cash out button is clicked allows user to take score and finish playing
function cashOut() {
    var win = document.getElementById("message");

    if(score > 0){
        win.innerHTML = "You win!  You cashed out with " + score + "!";
        score = 0;
        document.getElementById("score").innerHTML = score;
        document.body.style.backgroundImage = "url('coins.jpg')";
    }
    else {
        win.innerHTML = "You lose, better luck next time!";
    }
}