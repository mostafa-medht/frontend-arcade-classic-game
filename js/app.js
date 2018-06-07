var score = 0;
var totalSecs = 0;
var level = document.getElementById('lvlScore');
level.innerHTML = score;
const restart = document.getElementById('restart');
const minutesLabel = document.getElementById("minutes");
const secondsLabel = document.getElementById("seconds");

// initialize function to use with reset
window.init = function () {    
    timer = setInterval(setTime, 1000);
    window.clearInterval(timer);
    reset();
};

// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x ; 
    this.y= y ; 
    this.speed= speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Reset function

function reset(){
    totalSecs  = 0;
    level.innerHTML = '0';
    player.x = 202; // re-aligns position.1
    player.y = 405;
}

// reset event
restart.addEventListener('click', init);

var timer = setInterval(setTime, 1000);
// Set time function
function setTime (){
    totalSecs++ ; 
    secondsLabel.innerHTML = convertToStr(totalSecs%60);
    minutesLabel.innerHTML = convertToStr(parseInt(totalSecs/60));
}
// convert time to string fun 
function convertToStr (value){
    let valueStr = value + '' ;
    if (valueStr.length < 2){
        return '0' + valueStr; 
    } else {
        return valueStr;
    }
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // reset the position of the enemies , they reappear randomly with different speeds 
    if (this.x > 500){
        this.x -= 495;
        this.speed = 150 + Math.floor(Math.random() * 250);
    }

    // the collision between player and enemies

    if (player.x < this.x + 75 &&
        player.x + 47 > this.x &&
        player.y < this.y + 35 &&
        35 + player.y > this.y) {
        player.x = 202; // re-aligns position.1
        player.y = 405; // re-aligns position.2
        score = 0 ;     // reset score
        level.innerHTML = score; // reset score
        totalSecs = 0;  // reset timer
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Player class focusing on x and y axis
var Player = function( x , y ) {
    // Variables for the player to move along x and y axis 
    this.x = x ;
    this.y = y ; 

    //The image of the player of horn-girl is added to the playing field
    this.sprite = 'images/char-horn-girl.png';
};

// update function to reset the player when he/she win and calculate the high level
Player.prototype.update = function() {
    if (this.y < 0) {
       
        this.x = 202;
        this.y = 405;
        score++;
        level.innerHTML = score ;
        if(score >= 10) {
            alert(" :) Awesome! You made it and reach to Lvl 10 and beat the game :) ! in  " +  totalSecs + " Secs !!");
            document.getElementById("lvlScore").innerHTML = "0";
            totalSecs = 0;
        }
        
    }
};

// Renders the image of the user into the game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Allows the user to use the arrow keys to jump from tile to tile
Player.prototype.handleInput = function (keyPress) {
    // Enables user on left arrow key to move left on the x axis by 102
    // Also enables user not to go off the game tiles on the left side
    if (keyPress == 'left' && this.x > 0 ) {
        this.x -= 102 ;
    }

    // Enables user on right arrow key to move right on the x axis by 102
    // Also enables user not to go off the game tiles on the right side
    if (keyPress == 'right' && this.x < 405) {
        this.x += 102;
    }

    // Enables user on up arrow key to move upwards on the y axis by 83
    // Also enables user not to go off the game tiles on the top side
    if (keyPress == 'up' && this.y > 0 ) {
        this.y -= 83 ;  
    }

    // Enables user on down arrow key to move downwards on the y axis by 83
    // Also enables user not to go off the game tiles on the bottom side
    if (keyPress == 'down' && this.y < 405 ) {
        this.y += 83 ;
    }

    // Enables user on (a) btn key to move left on the x axis by 102
    // Also enables user not to go off the game tiles on the left side
    if (keyPress == 'a' && this.x > 0 ) {
        this.x -= 102 ;
    }

    // Enables user on (d) btn key to move right on the x axis by 102
    // Also enables user not to go off the game tiles on the right side
    if (keyPress == 'd' && this.x < 405) {
        this.x += 102;
    }

    // Enables user on (w) btn key to move upwards on the y axis by 83
    // Also enables user not to go off the game tiles on the top side
    if (keyPress == 'w' && this.y > 0 ) {
        this.y -= 83 ;
    }

    // Enables user on (s) key to move downwards on the y axis by 83
    // Also enables user not to go off the game tiles on the bottom side
    if (keyPress == 's' && this.y < 405 ) {
        this.y += 83 ;
    }

};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];

// Location of the 3 enemies on the y axis located on the stone road
var enemyPosition = [63, 147, 230];

enemyPosition.forEach(function(posY) {
    enemy = new Enemy(0, posY, 200);
    allEnemies.push(enemy);
});


// The starting location of the player is located at x=200, y=405
var player = new Player(202, 405);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        65: 'a',
        87: 'w',
        68: 'd',
        83: 's'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
