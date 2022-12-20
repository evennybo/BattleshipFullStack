
// Gets highscores from database
function get_highscores(){
    var serverLink = "http://127.0.0.1:3000/highscores"
    $.get(serverLink, data => { //Gets the data from the server
        console.log(createScoreBoard(data)); // display board
        }).fail(err => { //If it is an error in the server, it gives out an error message. 
            console.log("error")
        })
}
//Makes an array out of username and highscore
function make_array(data) {
    var array_data  = [];
    //adding every name to the database
    for (var i = 0; i < data.length; i++) {
        if(typeof data[i].move != "undefined") { //Checks if the username has a score
            array_data.push([data[i].username, data[i].move]); // appends username to the array
        }
    }
    return array_data;
}


get_highscores();