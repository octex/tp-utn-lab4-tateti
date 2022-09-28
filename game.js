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

class Game
{
    constructor()
    {
        this.player1 = null;
        this.player2 = null;
        this.currentPlayerTurn = null;
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
