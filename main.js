const gameBoard = (function (){

    let gameBoard = new Array(9);

    const cleanGameBoard = () => gameBoard = new Array (9); 

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
        checkLine(0,1,2) || // Row 1
        checkLine(3,4,5) || // Row 2
        checkLine(6,7,8) || // Row 3
        checkLine(0,4,8) || // Diagonal 1
        checkLine(2,4,6) || // Diagonal 2
        checkLine(0,3,6) || // Column 1
        checkLine(1,4,7) || // Column 2
        checkLine(2,5,8)  // Column 3
    )
    
    const checkIfHasEmptyCell = () => gameBoard.includes(undefined);
    
    
    const markMove = (position, playersymbol) =>
    {
        gameBoard[position] = playersymbol;
    }
    
    return {checkPosition, checkLine, checkIfWin, checkIfHasEmptyCell, markMove, cleanGameBoard};
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

    const tie = () => console.log ("Hey, es empate, por favor juega de nuevo");

    const winnerOfTheGame = (name) => console.log (`Hey ${name} ganaste el juego!`);

    let roundResult = new Array();

    const saveRoundResult = (value) => roundResult.push(value); 

    const evaluateRoundResults = (arr) =>
    {
        const result = arr.reduce((acc, val) =>
    {
         if (!acc[val])
        {
            acc[val] = 1;
        }
        else 
        {
            acc[val]++;
        }
        return acc;
    },{});

    const winner = Object.keys(result).find(key => result[key] > 1 && key !==`tie`);

    return ( winner || `tie` );
    }



    const playerMove = (position, symbol, name) =>
    {
        if (gameBoard.checkPosition(position) === undefined)
        {
            gameBoard.markMove(position, symbol);


            if (gameBoard.checkIfWin())
            {
                winnerOfTheRound(name);

                saveRoundResult(name);
                console.log(`Se pushea ${name} en roundresult`);

                gameBoard.cleanGameBoard();

            }
            else if (!gameBoard.checkIfHasEmptyCell())
            {
                tie();

                saveRoundResult(`tie`);
                console.log(`Se pushea "tie" en roundresult`);

                gameBoard.cleanGameBoard();

            }

            if (roundResult.length == 3)
            {
                if (evaluateRoundResults(roundResult) !== `tie` )
                {
                    
                    winnerOfTheGame(name);

                    console.log ("se ejecuta si roundresult.length == 3");

                    gameBoard.cleanGameBoard();

                }
                else 
                { 
                    tie();
                
                    gameBoard.cleanGameBoard();
                }
            }

        }
        else {console.log("El casillero esta ocupado, por favor juega de nuevo");}

    }

    return {playerMove};

})(gameBoard);


const player1 = createPlayer(gameController);
player1.setName("Diego");
player1.setSymbol("x");

const player2= createPlayer(gameController);
player2.setName("Skynet");
player2.setSymbol("O")

player1.move(0);

player1.move(1);

player1.move(2);


player1.move(0);

player1.move(1);

player1.move(2);


player1.move(0);

player1.move(1);

player1.move(2);
