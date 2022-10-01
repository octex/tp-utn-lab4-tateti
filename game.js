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

class PlayersManager
{
    constructor()
    {
        this.player1 = null;
        this.player2 = null;
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
}

class Game
{
    constructor(playerManager)
    {
        this.playerManager = playerManager;
        this.timer = new Timer();
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

    }
    renderTimer()
    {
        let timerStr = "Timer " + parseInt(this.timer.getTimer() / 60) + ":" + this.timer.getTimer() % 60;
        document.getElementById("timer").innerHTML = timerStr;
        this.timer.substractTimer();
    }
}
