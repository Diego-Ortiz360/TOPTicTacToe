const gameBoard = (function (){

    let gameBoard = new Array(9);

    const checkPosition = (position) =>
    {
            return gameBoard[position];   
    }

    const checkLine = (position1, position2, position3) => 
    {
        if (checkPosition(position1) != undefined && checkPosition(position2) != undefined && checkPosition(position3) != undefined)        
        {
            return checkPosition(position1) == checkPosition(position2) && checkPosition(position2) == checkPosition(position3);
        }

        else {return false}    
    }

    const checkIfWin = () => 
    ( 
        checkLine(0,1,2) ||
        checkLine(3,4,5) ||
        checkLine(6,7,8) ||
        checkLine(0,4,8) ||
        checkLine(6,4,2) ||
        checkLine(0,3,6) ||
        checkLine(1,4,7) ||
        checkLine(2,4,8) 
    )
    
    const checkIfHasEmptyCell = () => gameBoard.includes(undefined);
    
    
    const markMove = (position, playersymbol) =>
    {
        gameBoard[position] = playersymbol;
    }
    
    return {checkPosition, checkLine, checkIfWin, checkIfHasEmptyCell, markMove};
})();


function createPlayer(gameController){
    let name ="";
    let symbol = "";
    const setName = (playerName) => name = playerName;
    const getName = () => name;
    const getSymbol = () => symbol;
    const setSymbol = (symbolvalue) => symbol = symbolvalue;
    
    const move = (position) => 
    {
        gameController.playerMove(position,symbol,name);
    }

    return {setName,getName, getSymbol, setSymbol, move};
};


const gameController = (function (gameBoard){

    const winnerOfTheRound = (name) => console.log (`hey ${name} ganaste la ronda!`);

    const tieRound = () => console.log ("Hey, es empate");

    const winnerOfTheGame = () => console.log ("Hey ganaste el juego");

    let roundResult = new Array();


    const playerMove = (position, symbol, name) =>
    {
        if (gameBoard.checkPosition(position) === undefined)
        {
            gameBoard.markMove(position, symbol);

            if (gameBoard.checkIfWin())
            {
                winnerOfTheRound(name);

                roundResult.push(name);

                console.log (roundResult);
            }
            else if (!gameBoard.checkIfHasEmptyCell())
            {
                tieRound();

                roundResult.push("tie");
            }
        }
        else {console.log("El casillero esta ocupado, por favor juega de nuevo");}
    }

    return {playerMove};

})(gameBoard);


const player1 = createPlayer(gameController);

player1.setName("Diego");

player1.setSymbol("x");

player1.move(0);
player1.move(1);
player1.move(2);
