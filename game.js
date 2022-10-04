const X = 'X';
const O = 'O';
const BASE_TIMER_MINUTES = 1.5

class Timer
{
    constructor(minutes=BASE_TIMER_MINUTES)
    {
        this.baseTurnTimeInSeconds = 60 * minutes;
        this.timer = this.baseTurnTimeInSeconds;
    }
    getTimer()
    {
        return this.timer;
    }
    substractTimer()
    {
        if (this.timer > 0)
        {
            this.timer -= 1;
        }
    }
    resetTimer()
    {
        this.timer = this.baseTurnTimeInSeconds;
    }
}

class Player
{
    constructor(playerName, playerSymbol)
    {
        this.playerName = playerName;
        this.playerSymbol = playerSymbol;
    }

    getName()
    {
        return this.playerName;
    }

    getSymbol()
    {
        return this.playerSymbol;
    }
}

class Board
{
    constructor()
    {
        this.gameBoard = document.getElementsByClassName('game-board')[0].tBodies[0];
    }

    setBoardElementByRowAndColumn(row, column, content)
    {
        this.gameBoard.rows[row].cells[column].getElementsByTagName('button')[0].innerText = content;
    }

    getBoardElementByRowAndColum(row, column)
    {
        return this.gameBoard.rows[row].cells[column].getElementsByTagName('button')[0].innerText;
    }

    isAWinner()
    {
        let firstPos = undefined;
        let secondPos = undefined;
        let thirdPos = undefined;
    }
}

class PlayersManager
{
    constructor()
    {
        this.players = {
            X: null,
            O: null
        }
        this.currentPlayer = null;
        this.ready = false;
    }

    addPlayers()
    {
        let player1Name = document.getElementById("player1Name").value;
        let player2Name = document.getElementById("player2Name").value;
        //TODO: Validar que en los campos no vengan strings vacios
        this.addPlayer1(player1Name);
        this.addPlayer2(player2Name);
        this.currentPlayer = this.players[X];
        this.ready = true;
    }

    addPlayer1(playerName)
    {
        this.players[X] = new Player(playerName, X);
    }

    addPlayer2(playerName)
    {
        this.players[O] = new Player(playerName, O);
    }

    getPlayerBySymbol(symbol)
    {
        return this.players[symbol];
    }

    getOppositePlayer()
    {
        let player = null
        if (this.currentPlayer.getSymbol() == X)
        {
            player = this.players[O];
        }
        else
        {
            player = this.players[X];
        }
        return player;
    }

    switchTurn()
    {
        this.currentPlayer = this.getOppositePlayer();
    }
}

class Game
{
    constructor()
    {
        this.playersManager = new PlayersManager();
        this.timer = new Timer();
        this.board = new Board();
        this.gameBoard = document.getElementById("game");
        this.menu = document.getElementById("menu");
        this.turnTxt = document.getElementById("turn-txt");
        this.timerClock = undefined;
    }

    loadMenu()
    {
        this.menu.style.display = "";
        this.gameBoard.style.display = "none";
        clearInterval(this.timerClock);
        this.timer.resetTimer();
    }

    start()
    {
        this.menu.style.display = "none";
        this.gameBoard.style.display = "";
        this.turnTxt.innerText = "Turno de jugador: " + this.playersManager.currentPlayer.getName();
        this.timerClock = setInterval(this.renderTimer.bind(this), 1000);
    }

    giveUp()
    {
        let winner = this.playersManager.getOppositePlayer();
        // Run game over sequence and declare opposite player as winner
    }

    renderTimer()
    {
        let timerStr = "Timer " + parseInt(this.timer.getTimer() / 60) + ":" + this.timer.getTimer() % 60;
        document.getElementById("timer").innerHTML = timerStr;
        this.timer.substractTimer();
    }

    checkTimer()
    {
        if (this.timer.getTimer() == 0)
        {
            // Run game over sequence and call it an ace
        }
    }

    drawSymbol(row, column)
    {
        let currentCellContent = this.board.getBoardElementByRowAndColum(row, column);
        if (currentCellContent == X || currentCellContent == O)
        {
            return;
        }
        let cellContent = this.playersManager.currentPlayer.getSymbol();
        this.board.setBoardElementByRowAndColumn(row, column, cellContent);
        if (this.board.isAWinner())
        {
            // Run win game sequence
        }
        else
        {
            this.playersManager.switchTurn();
            this.turnTxt.innerText = "Turno de jugador: " + this.playersManager.currentPlayer.getName();
        }
    }
}
