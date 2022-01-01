// Game States
// "WIN" - Player robot has defeated all enemy-robots
//      * Fight all enemy-robots
//      * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less, exit from the fight loop.

// Display player's score in alert after the end of a game and ask if they want to play again
// After player defeats or skips an enemy-robot, they will be asked if they want to visit the shop

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;


// You can also log multiple values at once like this
console.log(playerName, playerAttack, playerHealth);

var enemyHealth = 50;
var enemyAttack = 12;
var enemyNames = ["Roborto", "Amy Andriod", "Robo Trumble"];

var fight = function(enemyName) {
    // repeat and execute as long as the enemy-robot is alive
    while(playerHealth > 0 && enemyHealth > 0)  {
        //place fight function code block here...
    
  var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

  // if player choses to skip
  if (promptFight === "skip" || promptFight === "SKIP") {
    // confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");
  

// if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerName + " has decided to skip this fight. Goodbye!");
      // subtract money from playerMoney for skipping
      playerMoney = Math.max(0, playerMoney - 10);
      console.log("playerMoney", playerMoney);
      break;
    }
  }

    // remove enemy's health by subtracting the amount set in the playerAttack variable
    // generate random damage value based on player's attack power
    var damage = randomNumber(playerAttack - 3, playerAttack);

    enemyHealth = Math.max(0, enemyHealth - damage);

    console.log(
      playerName + ' attacked ' + enemyName + '. ' + enemyName + ' now has ' + enemyHealth + ' health remaining.'
    );

    // check enemy's health
    if (enemyHealth <= 0) {
      window.alert(enemyName + ' has died!');

    // award player money for winning
      playerMoney = playerMoney + 20;

    // leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemyName + ' still has ' + enemyHealth + ' health left.');
    }

    // remove players's health by subtracting the amount set in the enemyAttack variable
    var damage = randomNumber(enemyAttack - 3, enemyAttack);
    
    playerHealth = Math.max(0, playerHealth - damage);
    
   console.log(
      enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
    );

    // check player's health
    if (playerHealth <= 0) {
      window.alert(playerName + " has died!");
    break;
    } 
    else {
      window.alert(playerName + " still has " + playerHealth + " health left.");
    }
}
};

var startGame = function() {
// rest player stats
playerHealth = 100;
playerAttack = 10;
playerMoney = 10;
for (var i = 0; i < enemyNames.length; i++) {
  if (playerHealth > 0) {
   // let player know what round they are in, remember that arrays start at 0, so it needs to have 1 added to it
   window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ));
  
   //pick new enemy to fight based on index of enemyNames array
   var pickedEnemyName = enemyNames[i];

   //reset enemyHealth before starting new fight
   enemyHealth = randomNumber(40, 60);
   
   // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
   fight(pickedEnemyName);

   // if we're not at the last enemy in the array
   if (playerHealth > 0 && i < enemyNames.length - 1) {
     // ask if player wants to use the store before next round
     var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
     
     // if yes, take them to the store() function
     if (storeConfirm) {
     shop();
   }
  }
}
  else {
    window.alert("You have lost your robot in battle! Game over!");
  break;
  }
}
// after the loop ends, player is either out of health or enemies to fight, so run the endGame function
endGame();
};

// function to end the entire game
  var endGame = function() {
    // if player is still alive, player wins!
  if (playerHealth > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
  } else {
    window.alert("You've lost your robot in battle.");
  }
  // ask player if they'd like to play again
  var playAgainConfirm = window.confirm("Would you like to play again?");
  
  if (playAgainConfirm) {
    // restart game
    startGame();
  }
  else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
  
    window.alert("The game has now ended. Let's see how you did!");
  }

  var shop = function() {
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
      "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );

    // use switch to carry out action
    switch (shopOptionPrompt) {
      case "refill":
        if (playerMoney >= 7) {
        window.alert("Refilling player's health by 20 for 7 dollars.");
  
        // increase health and decrease money
        playerHealth = playerHealth + 20;
        playerMoney = playerMoney - 7;
      }
      else {
        window.alert("You don't have enough money!");
      }

      break;
    
      case "UPGRADE": // new case
      case "upgrade":
        if (playerMoney >= 7) {
        window.alert("Upgrading player's attack by 6 for 7 dollars.");

        // increase attack and decrease money
        playerAttack = playerAttack + 6;
        playerMoney = playerMoney - 7;
        }
        else {
          window.alert("You don't have enough money!");
        }

        break;
        case "LEAVE": // new case
        case "leave":
          window.alert("Leaving the store.");

        // do nothing, so function will end
        break;
      default:
        window.alert("You did not pick a valid option. Try again.");

        // call shop() again to force player to pick a valid option
        shop();
        break;
    }
  };

  // function to generate a random numeric value
  var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
  }
   // play again
startGame();