// Made by Even Myren Nybø
var gameOver = false; 

var gamePlay = {
    Battleship: Object.create(battleship),
//gets then returns the username
    getUsername: function () {
        var URL = window.location + "";
        var UsernameURL = URL.split("=");
        return UsernameURL[1];
    },
//uses  Battleship member to setup and start a game
    playGame: function () {
        this.Battleship.initialize();
        this.Battleship.createShips();
        setUsername(this.getUsername());
        createHTMLTable();
    },
// If all ships are marked, it adds a “Game over” message to the message div.
    isGameOver: function () {
        var ships_destoyed=0;
       
        for (let i = 0; i < allVessels.length; i++) {
            ships_destoyed += allVessels[i].getHits()-1;
        }
        ships_destoyed++;
        if (gameHits === 0){
            addMessage("<br>");
            addMessage("Winner winner chicken dinner!");
            gameOver = true
        }
        return gameOver;
    },
// Resets the game board, resets the message div and starts a new game
    reset: function () {
        this.Battleship = Object.create(battleship);
        gameOver = false;
        clearMessages();
        this.playGame();
    }
};


