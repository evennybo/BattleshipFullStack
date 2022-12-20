
var express = require('express');
var router = express.Router();
//use database manager module
var mydb = require('./dbmgr.js');

//use the url module
const url = require('url');
const { Db } = require('mongodb');
const { diffieHellman } = require('crypto');
const { listenerCount } = require('process');
const { json } = require('express');
const { request } = require('http');

var  player1score = 0;
var player2score = 0;

router.get('/', function(req,res){
    res.send('you are at / route');
});

//Demo / route to print hello
router.post('/username', function (req, res) {
    if(req.body.username){
        mydb.insertRec({username: req.body.username})
    }
    res.send(req.body.username)
});

//Sends the player1 in data to the /player1 route
router.get('/player1', function (req, res) {
    let dataURL = url.parse(req.url,true);
    if(dataURL.query.username != null){
        player1score = 1 + player1score;
        console.log(player1score); 
        if(dataURL.query.status == "gameover"){ //Checks if game is over
            
            //Validates if the new score is better then the previous score 
            callbackFn = function(player){
                //Checks if player has a previous score
                if(player != null){
                    //Checks if the new score is better
                    if(player.move > player1score || player.move == "" || typeof player.move == 'undefined'){
                        
                        mydb.updateData({username: player.username}, {move: player1score})
                        console.log("Updated ", JSON.stringify({username: player.username}), " score is now: ", JSON.stringify({move: player1score}));
                        player1score = 0; // resets the player1score
                    }
                    else{
                        console.log("player info; ", player);
                        player1score = 0; // resets the player1score
                    }    
                }
                else{
                    
                     // inserts the old move, so they will keep their best score
                    mydb.insertRec({username: username, move: move})
                }    
                res.send("data is updated successfully")
            }
            //Find the record of the username that is playing
            mydb.findRec({username: dataURL.query.username}, callbackFn)   
        }
        else{res.send("No username found!");}
    }
});


//Sends the player1 in data to the /player1 route
router.get('/player2', function (req, res) {
    let dataURL = url.parse(req.url,true);
    if(dataURL.query.username != null){
        player2score = 1 + player2score;
        console.log(player2score); 
        if(dataURL.query.status == "gameover"){ //Checks if game is over
            
            //console.log(req.query.move, "move")
            console.log(dataURL.query.username, "username")
            console.log(player2score, "part 2");
            //Validates if the new score is better then the previous score 
            callbackFn = function(player){
                //Checks if player has a previous score
                if(player != null){
                    console.log(player.move, "move");
                    //Checks if the new score is better
                    if(player.move > player1score || player.move == "" || typeof player.move == 'undefined'){
                        
                        mydb.updateData({username: player.username}, {move: player2score})
                        console.log("Updated ", JSON.stringify({username: player.username}), " score is now: ", JSON.stringify({move: player2score}));
                        player1score = 0; // resets the player2score
                    }
                    else{
                        console.log("player info; ", player);
                        player1score = 0; // resets the player2score
                    }    
                }
                else{
                    console.log("player data is", player)
                     // inserts the old move, so they will keep their best score
                    mydb.insertRec({username: username, move: move})
                }    
                res.send("data is updated successfully")
            }
            //Find the record of the username that is playing
            mydb.findRec({username: dataURL.query.username}, callbackFn)
        }
        else{res.send("No username found!");}
    }
});

// highscores route, will get all records to request
router.get('/highscores', function (req, res) {
    
    callback =  function(req) {
        res.send(req);
    }
    mydb.findAll(0, "move", callback)
    
});

module.exports = router;