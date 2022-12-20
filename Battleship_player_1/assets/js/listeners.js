// Made by Even Myren Nybø

let serverLink = 'http://127.0.0.1:3000/player1';
let gamestate = ""

newGame = Object.create(gamePlay);
newGame.playGame();

document.querySelector("#gametable").addEventListener('click', e => {
    const tableElement = e.target;
    
    if (gameOver != true) {
        if ((tableElement !== null) && (tableElement.tagName.toLowerCase() === "td")) {
            //Checks if the box has already been clicked or not
            if (e.target.innerHTML == "") {
                //web
                
                
                //Gets the current value of the box that is getting cliked
                let x_coor = e.target.parentNode.rowIndex - 1;
                let y_coor = e.target.cellIndex;
                var move = newGame.Battleship.makeMove([x_coor, y_coor]);
               

                addClass(e.target, move); //Flips to
                //Checks if box is hit, or missed and changes the messanger text to match the ship
                if (move === "miss") {
                    changeText(tableElement, move);
                    //
                    gamestate = "miss";
                    
                }
                else {
                    changeText(tableElement, move[0].toUpperCase());
                    gamestate = "hit";
                    };
                // Checks if every ship is hit.
                var gameOver = newGame.isGameOver();
                // Checks if game is over to send the right parameter to the get request
                if (gameOver == true) {
                    gamestate = "gameover";
                }
                $.get(serverLink, {status: gamestate, xcoordinate: x_coor, ycoordinate: y_coor, username: gamePlay.getUsername()})
            }
            else {
                addMessage("Already clicked");
            } 
        }
    }
});
//addEventListeners to listen for restart button which restarts the game.
document.querySelector("#resetButton").addEventListener('click', e => {
    //Resets Game
    newGame.reset();
});
