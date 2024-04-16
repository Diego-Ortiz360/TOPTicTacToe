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
    

    const markMove = (playersymbol, position) =>
    {
        gameBoard[position] = playersymbol;
    }
    
    return {checkPosition, checkLine, markMove};

})();

function createPlayer(){

    let symbol = "";

    const getSymbol = () => symbol;
    const setSymbol = (symbolvalue) => symbol = symbolvalue;
    
    const move = (position) => console.log (`Colocaste ${symbol} en la posicion ${position}`);

    let next = false;

    const isNext = () => next;

    const setNextTurn = (status) => next = status;
    
    return {getSymbol, setSymbol, move, isNext, setNextTurn};

};

const gameController = (function (){

    const winnerOfTheRound = () => console.log ("hey ganaste");

    const tieRound = () => console.log ("Hey, es empate");

    const winnerOfTheGame = () => console.log ("Hey ganaste el juego");

    let roundResult = new Array(3);

    const setRoundResult = (position, value) => roundResult[position] = value;

    const getRoundResult = (position) => roundResult[position];

    const checkGameBoard = (gameBoard) =>
    {
        if (gameBoard.checkLine(0,1,2) ||
            gameBoard.checkLine(3,4,5) ||
            gameBoard.checkLine(6,7,8) ||
            gameBoard.checkLine(0,4,8) ||
            gameBoard.checkLine(6,4,2) ||
            gameBoard.checkLine(0,3,6) ||
            gameBoard.checkLine(1,4,7) ||
            gameBoard.checkLine(2,4,8))
    {
        console.log ("hey");
    }

    else console.log ("Nope");
    }

    const checkGameBoardPosition = (gameBoard,position) =>
    {
        return gameBoard.checkPosition(position);
    }

    return {checkGameBoard, checkGameBoardPosition};
})();

gameBoard.markMove("x",6);
gameBoard.markMove("x",4);
gameBoard.markMove("y",2);

gameController.checkGameBoard(gameBoard);

