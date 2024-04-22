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


function createPlayer(gameController){

    let name ="";
    let symbol = "";

    const setName = (playerName) => name = playerName;
    const getname = () => name;

    const getSymbol = () => symbol;
    const setSymbol = (symbolvalue) => symbol = symbolvalue;

    function move(position) 
    {
        gameController.playerMove(position, this);
    }

    return {setName,getname, getSymbol, setSymbol, move};
};

const gameController = (function (gameBoard){

    const winnerOfTheRound = (name) => console.log (`hey ${name} ganaste la ronda!`);

    const tie = (roundOrGame) => console.log (`Hey!, the ${roundOrGame} is TIE, please play again!`);

    const winnerOfTheGame = (name) => console.log (`Hey ${name} ganaste el juego!`);

    let roundResult = new Array();

    const getRoundResult = () => roundResult;

    const saveRoundResult = (value) => roundResult.push(value); 

    const evaluateRoundResults = () =>
    {
        
    const winner = roundResult.find( (value,index,self) =>  
        
        self.indexOf(value) !== index && value != `tie`
    );
        return ( winner || `tie`)
        
    };


    const playerMove = (position, player) =>
    { 
        if (gameBoard.checkPosition(position) === undefined)
        {

            gameBoard.markMove(position, player.getSymbol());

            console.log (`El jugador ${player.getname()} jugó ${position} `);
            

            if (gameBoard.checkIfWin())
            {
                winnerOfTheRound(player.getname());
                console.log (`el ganador de la ronda es: ${player.getname()}`);
                saveRoundResult(player.getname());
                gameBoard.cleanGameBoard();
            }

            else if (!gameBoard.checkIfHasEmptyCell())
            {
                tie(`round`);
                saveRoundResult(`tie`);
                gameBoard.cleanGameBoard();
            }

            if (roundResult.length == 3)
            {
                if (evaluateRoundResults() !== `tie` )
                {                    
                    winnerOfTheGame(player.getname());
                    gameBoard.cleanGameBoard();
                }
                else 
                { 
                    tie(`game`);   
                    gameBoard.cleanGameBoard();
                }
            }
        }
        else { console.log (`The cell is already taken, please try again`);}
    }

    return {playerMove};

})(gameBoard);

/* 
const player1 = createPlayer(gameController);
player1.setName(`Diego`);
player1.setSymbol(`X`);

const player2 = createPlayer(gameController);
player2.setName(`Skynet`);
player2.setSymbol(`O`);


player2.move(0);
player2.move(1);
player2.move(2);

player1.move (0);
player1.move (1);
player1.move (2);



player1.move (0);
player2.move (1);
player2.move (2);

player2.move (3);
player1.move (4);
player1.move (5);

player1.move (6);
player2.move (7);
player2.move (8); 
 */