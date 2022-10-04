class Timer
{
    constructor(minutes=1.5)
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
        return this.getSymbol;
    }
}

class Board
{
    constructor()
    {
        // game.board.getBoardElementByRowAndColumn(0, 0).getElementsByTagName('button')[0].innerText = 'X';
        // Usar esto para cambiar el contenido y obtenerlo en las validaciones
        this.gameBoard = document.getElementsByClassName('game-board')[0].tBodies[0];
    }

    getBoardElementByRowAndColumn(row, column)
    {
        return this.gameBoard.rows[row].cells[column];
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
        this.player1 = null;
        this.player2 = null;
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
        this.ready = true;
    }

    addPlayer1(playerName)
    {
        this.player1 = new Player(playerName, 'X');
    }

    addPlayer2(playerName)
    {
        this.player2 = new Player(playerName, 'O');
    }

    getPlayerBySymbol()
    {
        //TODO
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
    }
    loadMenu()
    {
        this.menu.style.display = "";
        this.gameBoard.style.display = "none";
    }
    start()
    {
        this.menu.style.display = "none";
        this.gameBoard.style.display = "";
        setInterval(this.renderTimer.bind(this), 1000);
    }
    giveUp()
    {
        //TODO
    }
    renderTimer()
    {
        let timerStr = "Timer " + parseInt(this.timer.getTimer() / 60) + ":" + this.timer.getTimer() % 60;
        document.getElementById("timer").innerHTML = timerStr;
        this.timer.substractTimer();
    }
}
