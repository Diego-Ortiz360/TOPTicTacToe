const gameBoard = (function (){

    let gameBoard = new Array(9);

    const checkPosition = (position) =>
    {
        return gameBoard[position];
    }

    const markMove = (playersymbol, position) =>
    {
        gameBoard[position] = playersymbol;
    }

    const checkGameBoard = () => 
    {
        gameBoard.map((value)=>
    {
        console.log (value);
    });
    }
    
    return {checkPosition, markMove, checkGameBoard};

})();

function createPlayer(){

    let symbol = "";

    const getSymbol = () => symbol;
    const setSymbol = (symbolvalue) => symbol = symbolvalue;
    
    const move = (position) => console.log (`Colocaste ${symbol} en la posicion ${position}`);

    let next = false;

    const isNext = () => next;

    const setNext = (status) => next = status;
    
    return {getSymbol, setSymbol, move, isNext, setNext};

};

const gameController = (function (){

    const winnerOfTheRound = () => console.log ("hey ganaste");

    const tieRound = () => console.log ("Hey, es empate");

    const winnerOfTheGame = () => console.log ("Hey ganaste el juego");

    let roundResult = new Array(3);

    const setRoundResult = (position, value) => roundResult[position] = value;

    const getRoundResult = (position) => roundResult[position];

    const getAllTheRoundResults = () => roundResult.map ((value)=> console.log (value));

    const nextPlay =() =>
    {
        
    }

    return {winnerOfTheRound, tieRound, winnerOfTheGame,setRoundResult,getRoundResult,getAllTheRoundResults, nextPlay};
})();

