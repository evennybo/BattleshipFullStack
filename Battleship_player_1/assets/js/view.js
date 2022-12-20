// Made by Even Myren Nybø
//adds a given class to an element if it does not have the class. Does nothing otherwise.
function addClass(element, className) {

    if (element.classList)
        element.classList.add(className);
    else if (!hasClass(element, className))
        element.className += " " + className;
}
//removes a given class from an element if the class has it. Does nothing otherwise.
function removeClass(element, className) {
    if (element.classList)
        element.classList.remove(className);
}

//changes the text of a given element to the given message
function changeText(element, msg) {
    if (element !== null)
        element.innerHTML = msg;
}
//removes all messages from the message div.
function clearMessages() {
    var messageDiv = document.getElementById("messagediv");
    if (messageDiv !== null)
        messageDiv.innerHTML = null;
}
//adds a given text (msg) to the message div.
function addMessage(msg) {
    var messageDiv = document.getElementById("messagediv");
    if (messageDiv !== null)
        messageDiv.innerHTML += msg+"<br>";
    messageDiv.scrollTop = messageDiv.scrollHeight;
}

//Adds a mark message to a given game board box
function markBox(element, className) {
    if (element.classList)
        element.classList.add(className);
    else if (!hasClass(element, className))
        element.className += " " + className;
}
//Displays username on the game page
function setUsername(userName) {
    var usernameDiv = document.getElementById("usernameDiv");
    changeText(usernameDiv, userName);
    addMessage(userName);
    //Sends the username to check if it is a username that already is in database
    $.post("http://127.0.0.1:3000/username", {username: userName}, function(result){console.log("Sent username",result)});
    
}
//creates HTML table
function createHTMLTable() {
    var htmlTable = document.getElementById("gametable");
    //if a table doesn't exist, exit
    if (!htmlTable) {
        addMessage("No game table exiting");
        return;
    }
    //remove all table elements if they exist resets
    while (htmlTable.firstChild) {
        htmlTable.removeChild(htmlTable.firstChild);
    }
    //add a header row with letters A - J
    var headerRow = document.createElement("tr");
    for (let j = 0; j < boardXsize; j++) {
        var headerCell = document.createElement("th");
        //Use ASCII codes to fill the header
        headerCell.innerHTML = String.fromCharCode(j + 65);
        headerRow.appendChild(headerCell);
    }
    
    htmlTable.appendChild(headerRow);
    //add the table body using board size
    for (let i = 0; i < boardYsize; i++) {
        var newRow = document.createElement("tr");
        for (let j = 0; j < boardXsize; j++) {
            var newTd = document.createElement("td");
            newTd.setAttribute("id", "coord-" + i + "-" + j);
            addClass(newTd, "vessel");
            newRow.appendChild(newTd);
        }
        htmlTable.appendChild(newRow);
    }
}

function createScoreBoard(arr){
    var htmlTable = document.getElementById("scoreBoard");
    var username_score_rank = 3; // coloms
    
    var us = make_array(arr); // Get the array of highscores 
    var users = 0; // Amount highscores 
    var headerRow = document.createElement("tr");
    //Initilizes the length board. Max ten highscores
    if(us.length > 10){ users = 10 } 
    else{users = us.length }

    //Double for loop to check display the usernames and the highscores
    for (let j = 0; j < username_score_rank; j++) {
        var headerCell = document.createElement("th");
        //adding the headers for the scoreBoard
        if(j == 0){
            headerCell.innerHTML = "Rank";
            headerRow.appendChild(headerCell);
        }
        else if(j == 1){
            headerCell.innerHTML = "Player";
            headerRow.appendChild(headerCell);
        }
        else {
            headerCell.innerHTML = "Highscore";
            headerRow.appendChild(headerCell);
        }
    }
    htmlTable.appendChild(headerRow);

    // add scores and usernames to the table
    for (let i = 0; i < users; i++) {
        var newRow = document.createElement("tr");
        for (let j = 0; j < username_score_rank-1; j++) {
            var newTd = document.createElement("td");
            // Adds numbers to the table ranks
            if(j == 0){
                var newTd = document.createElement("td");
                newTd.innerHTML = i + 1;
            }
            //add usernames to the table 
            else if (j == 1){ 
                var newTd = document.createElement("td");
                newTd.innerHTML = us[i][0];
                newRow.appendChild(newTd);
                htmlTable.appendChild(newRow);
                var newTd = document.createElement("td");
                newTd.innerHTML = us[i][1];
                ;
            }
            //Adds the higscore to the table 
            else if (j == 1){ 
                var newTd = document.createElement("td");
                newTd.innerHTML = us[i][1];
            }
            newRow.appendChild(newTd);
            htmlTable.appendChild(newRow);
        }
    }
}
function miniTable() {
    var htmlTable = document.getElementById("mini_gametable");
    //if a table doesn't exist, exit
    if (!htmlTable) {
        addMessage("No game table exiting");
        return;
    }
    //remove all table elements if they exist resets
    while (htmlTable.firstChild) {
        htmlTable.removeChild(htmlTable.firstChild);
    }
    //add a header row with letters A - J
    var headerRow = document.createElement("tr");
    for (let j = 0; j < boardXsize; j++) {
        var headerCell = document.createElement("th");
        //Use ASCII codes to fill the header
        headerCell.innerHTML = String.fromCharCode(j + 65);
        headerRow.appendChild(headerCell);
    }
    
    htmlTable.appendChild(headerRow);
    //add the table body using board size
    for (let i = 0; i < boardYsize; i++) {
        var newRow = document.createElement("tr");
        for (let j = 0; j < boardXsize; j++) {
            var newTd = document.createElement("td");
            newTd.setAttribute("id", "coord-" + i + "-" + j);
            addClass(newTd, "vessel");
            newRow.appendChild(newTd);
        }
        htmlTable.appendChild(newRow);
    }
}


