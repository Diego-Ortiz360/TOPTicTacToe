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

    const saveRoundResult = (value) => roundResult.push(value); 

    const evaluateRoundResults = () =>
    {
        
    const winner = roundResult.find( (value,index,self) =>  
        
        self.indexOf(value) !== index && value != `tie`
    );
        return ( winner || `tie`)
        
    };

function createPlayer(playerName, playerSymbol){

    let name = playerName;
    let symbol = playerSymbol;

    const getname = () => name;
    const getSymbol = () => symbol;

    function move(position) 
    {
        playerMove(position, this);
    }

    return {getname, getSymbol, move};
};

    const playerMove = (position, player) =>
    { 
        if (gameBoard.checkPosition(position) === undefined)
        {

            gameBoard.markMove(position, player.getSymbol());

            console.log (`El jugador ${player.getname()} jugó ${position} `);
            

            if (gameBoard.checkIfWin())
            {
                winnerOfTheRoundMsg(player.getname());
                console.log (`el ganador de la ronda es: ${player.getname()}`);
                saveRoundResult(player.getname());
                gameBoard.cleanGameBoard();
            }

            else if (!gameBoard.checkIfHasEmptyCell())
            {
                tieMsg(`round`);
                saveRoundResult(`tie`);
                gameBoard.cleanGameBoard();
            }

            if (roundResult.length == 3)
            {
                if (evaluateRoundResults() !== `tie` )
                {                    
                    winnerOfTheGameMsg(player.getname());
                    gameBoard.cleanGameBoard();
                }
                else 
                { 
                    tieMsg(`game`);   
                    gameBoard.cleanGameBoard();
                }
            }
        }
        else { console.log (`The cell is already taken, please try again`);}
    }

    return {createPlayer, playerMove};

})(gameBoard);

/* 
const player1 = gameController.createPlayer("Diego", "x");

console.log (player1.getname()); 
 */
