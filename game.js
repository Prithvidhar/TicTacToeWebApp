const game =(()=>{
    var turn = "X";
    var gameover= false;
    var movecount = 0;
    var cause = "";
    //Represents TTT gameboard
    var gameboard = [[0,0,0],
                        [0,0,0],
                        [0,0,0]];
    const summondialog = (insidestuff) =>
    {
        var d = document.querySelector("dialog");
        var child = document.querySelector("dialog h1");
        d.showModal();
        child.innerText = insidestuff;

    }
    //function to update gameboard
    const changeTurn = () =>
    {
        if(turn==="X")
        {
            turn = "O";
        }
        else{
            turn = "X";
        }
    }
    const reset = async ()=>
    {
        await updateUI();
        gameboard = [[0,0,0],
        [0,0,0],
        [0,0,0]];
        turn = "X";
        movecount = 0;
        var tiles = document.querySelectorAll(".tile");
        tiles.forEach(tile=>
            {
                var row = parseInt(tile.id[1]);
                var col = parseInt(tile.id[2]);
                tile.innerText = "place tile here"
                tile.id ="E" +row.toString() + col.toString();
            })
        gameover = false;
        document.querySelector(".turn").innerText= "It's Player X's turn";
    }
    const update = (event) =>
    {   
        
        var row = parseInt(event.target.id[1]);
        var col = parseInt(event.target.id[2]);
        if(event.target.id[0]!=="E")
        {
            return;
        }
        else
        {
            //updating gameboardbased on turn
            
            gameboard[row][col] = turn;
        }
        //Checking for gameover code from: https://stackoverflow.com/questions/1056316/algorithm-for-determining-tic-tac-toe-game-over
        //col check
        for(var i = 0;i <3;i++)
        {
            if(gameboard[row][i]!=turn)
            {
                break;
            }
            if(i===2)
            {
                console.log(turn + "wins!");
                gameover = true;
                cause += "win";
                summondialog(`${turn} Wins Congratultions`);
                
            }
        }
        //row check
        for(var i = 0;i <3;i++)
        {
            if(gameboard[i][col]!=turn)
            {
                break;
            }
            if(i===2)
            {
                console.log(turn + "wins!");
                gameover = true;
                cause += "win";
                summondialog(`${turn} Wins Congratultions`);
                
            }
        }
        //diag check
        if(row===col)
        {
            for(var i = 0;i <3;i++)
            {
                if(gameboard[i][i]!=turn)
                {
                    break;
                }
                if(i===2)
                {
                    console.log(turn + "wins!");
                    gameover = true;
                    cause += "win";
                    summondialog(`${turn} Wins Congratultions`);
                    
                }
            }
        }
        if(row+col===2)
        {
            for(var i = 0;i <3;i++)
            {
                if(gameboard[i][2-i]!=turn)
                {
                    break;
                }
                if(i===2)
                {
                    console.log(turn + " wins!");
                    gameover = true;
                    cause += "win";
                    summondialog(`${turn} Wins Congratultions`);
                    
                }
            }
        }
        if(movecount === 9)
        {
            gameover = true;
            cause += "draw";
            summondialog(`It's a draw! You both Lose!`);
            
        }
        movecount++;
        changeTurn();
        console.log(gameboard);
        console.log(turn);
        updateUI();
        if(gameover)
        {
            reset();

        }

    }
    const getTurn = () =>
    {
        return turn;
    }
    const getGO = () =>
    {
        return gameover;
    }
    const getCause = () => {return cause};
    
    const updateUI = async()=>
    {
        //looping over tiles
        var tiles = document.querySelectorAll(".tile");
        // var tiles = [...tiles];
        tiles.forEach(tile =>
            {
                // console.log(tiles);
                var row = parseInt(tile.id[1]);
                var col = parseInt(tile.id[2]);
                if (gameboard[row][col]==="X")
                {
                    tile.innerText = "X"
                    tile.id ="X" +row.toString() + col.toString(); 
                }
                else if(gameboard[row][col]==="O")
                {
                    tile.innerText = "O"
                    tile.id ="O" +row.toString() + col.toString(); 
                }
               
                
            })
            var turnUI = document.querySelector(".turn");
            turnUI.innerHTML = `It's Player ${turn}'s turn`;
        
    }
    return {update, getGO,getTurn,getCause};
    
    
})()
const thegame =  game;
var tiles = document.querySelectorAll(".tile");
tiles.forEach(tiley=>{
    tiley.addEventListener("click",thegame.update);
})
console.log(thegame.getTurn());


