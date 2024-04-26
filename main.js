

const gameBoard = (function (){

    let gameBoard = new Array(9);

    const cleanGameBoard = () => gameBoard = new Array (9); 

    const getGameBoard = () => console.log(gameBoard);

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
        checkLine(2,5,8)    // Column 3
    )
    
    const checkIfHasEmptyCell = () => gameBoard.includes(undefined);
    
    const markMove = (position, playersymbol) =>
    {
        gameBoard[position] = playersymbol;
    }
    
    return {checkPosition, checkLine, checkIfWin, checkIfHasEmptyCell, markMove, cleanGameBoard,getGameBoard};
})();



const gameController = (function (gameBoard){

    const winnerOfTheRoundMsg = (name) => console.log (`hey ${name} you win the round!`);

    const tieMsg = (roundOrGame) => console.log (`Hey!, the ${roundOrGame} is TIE, please play again!`);

    const winnerOfTheGameMsg = (name) => console.log (`Hey ${name} you win the game!`);

    let roundResult = new Array();

    const getRundResult = () => roundResult;

    const saveRoundResult = (value) => roundResult.push(value); 

    const evaluateRoundResults = () =>
    {
        
    const winner = roundResult.find( (value,index,self) =>  
        
        self.indexOf(value) !== index && value != `tie`
    );
        return ( winner || `tie`)        
    };

    const roundWon = (playerName) =>
    {
        winnerOfTheRoundMsg(playerName);
        console.log (`el ganador de la ronda es: ${playerName}`);
        saveRoundResult(playerName);
        gameBoard.cleanGameBoard();
    }

    const tiedRound = () =>
    {
        tieMsg(`round`);
        saveRoundResult(`tie`);
        gameBoard.cleanGameBoard();
    }


    const gameWon = (playerName) =>
    {
        winnerOfTheGameMsg(playerName);
        gameBoard.cleanGameBoard();
    }

    const tiedGame = () =>
        {
            tieMsg(`game`);   
            gameBoard.cleanGameBoard();
        }

    return {roundWon, tiedRound, gameWon, tiedGame, getRundResult, evaluateRoundResults};

})(gameBoard);


const playerController = (function (gameBoard,gameController)
{
    let players = 0

    function createPlayer(playerName, playerSymbol)
    {
        if (players < 2)
        {

        players++;

        let name = playerName;
        let symbol = playerSymbol;

        const getName = () => name;
        const getSymbol = () => symbol;
    
        function move(position) 
        {

        if (gameBoard.checkPosition(position) === undefined)
        {
            gameBoard.markMove(position, getSymbol() );

            console.log (`El jugador ${getName()} jugó ${position} `);
        
            if (gameBoard.checkIfWin())
            {
                gameController.roundWon(getName());                
            }
             
            else if (!gameBoard.checkIfHasEmptyCell())
            {
                    gameController.tiedRound();
                    
            }

            if (gameController.getRundResult().length == 3)
            {
                if (gameController.evaluateRoundResults() !== `tie` )
                {                  
                    gameController.gameWon(getName());
                }
                else 
                { 
                    gameController.tiedGame();
                }
            }
        }
        else { console.log (`The cell is already taken, please try again`);}       
        }
    
        return {getName, getSymbol, move};
        }

        else (console.log ("Solo se puede jugar de a 2"));

    };

    return {createPlayer};
    
})(gameBoard,gameController);

//Código para probar que funcione el crear los jugadores solamente, borrar todo para mantener limpio

/* const player1 = playerController.createPlayer("Diego","x");

console.log (player1.getName());
console.log (player1.getSymbol());
player1.move(0);

const player2 = playerController.createPlayer("SKynet", "o");
console.log (player2.getName());
console.log (player2.getSymbol());
player2.move(1); */
