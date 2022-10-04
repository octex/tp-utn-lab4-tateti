const X = 'X';
const O = 'O';
const BLANK_SLOT = 'ㅤ';
const BASE_TIMER_MINUTES = 1.5
const TIE = "Empate"
const KEY_MATCHES_SAVE = 'matches'


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

    clearBoard()
    {
        for (let i = 0; i < 3; i++)
        {
            this.setBoardElementByRowAndColumn(i, 0, BLANK_SLOT);
            this.setBoardElementByRowAndColumn(i, 1, BLANK_SLOT);
            this.setBoardElementByRowAndColumn(i, 2, BLANK_SLOT);
            this.setBoardElementByRowAndColumn(0, i, BLANK_SLOT);
            this.setBoardElementByRowAndColumn(1, i, BLANK_SLOT);
            this.setBoardElementByRowAndColumn(2, i, BLANK_SLOT);
        }
    }

    areAllSlotsFull()
    {
        for (let i = 0; i < 3; i++)
        {
            if (this.getBoardElementByRowAndColum(i, 0) == BLANK_SLOT
                || this.getBoardElementByRowAndColum(i, 1) == BLANK_SLOT
                || this.getBoardElementByRowAndColum(i, 2) == BLANK_SLOT
                || this.getBoardElementByRowAndColum(0, i) == BLANK_SLOT
                || this.getBoardElementByRowAndColum(1, i) == BLANK_SLOT
                || this.getBoardElementByRowAndColum(2, i) == BLANK_SLOT)
            {
                return false;
            }
        }
        return true;
    }

    checkCells(firstPos, secondPos, thirdPos, playerSymbol)
    {
        if (firstPos == playerSymbol &&
                secondPos == playerSymbol &&
                thirdPos == playerSymbol)
        {
            return true;
        }
        return false;
    }

    isAWinner(playerSymbol)
    {
        let firstPos = null;
        let secondPos = null;
        let thirdPos = null;
        let cellCheck = null;

        for (let i = 0; i < 3; i++)
        {
            // Horizontal compare
            firstPos = this.getBoardElementByRowAndColum(i, 0);
            secondPos = this.getBoardElementByRowAndColum(i, 1);
            thirdPos = this.getBoardElementByRowAndColum(i, 2);
            cellCheck = this.checkCells(firstPos, secondPos, thirdPos, playerSymbol);
            if (cellCheck)
            {
                return cellCheck;
            }

            // Vertical compare
            firstPos = this.getBoardElementByRowAndColum(0, i);
            secondPos = this.getBoardElementByRowAndColum(1, i);
            thirdPos = this.getBoardElementByRowAndColum(2, i);
            cellCheck = this.checkCells(firstPos, secondPos, thirdPos, playerSymbol);
            if (cellCheck)
            {
                return cellCheck;
            }
        }

        // Diagonal left compare
        firstPos = this.getBoardElementByRowAndColum(0, 0);
        secondPos = this.getBoardElementByRowAndColum(1, 1);
        thirdPos = this.getBoardElementByRowAndColum(2, 2);
        cellCheck = this.checkCells(firstPos, secondPos, thirdPos, playerSymbol);
        if (cellCheck)
        {
            return cellCheck;
        }

        // Diagonal right compare
        firstPos = this.getBoardElementByRowAndColum(0, 2);
        secondPos = this.getBoardElementByRowAndColum(1, 1);
        thirdPos = this.getBoardElementByRowAndColum(2, 0);
        cellCheck = this.checkCells(firstPos, secondPos, thirdPos, playerSymbol);
        if (cellCheck)
        {
            return cellCheck;
        }

        return false;
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
        if (player1Name == '' || player2Name == '')
        {
            alert("Ingrese los nombres de los jugadores!");
            return;
        }
        else if (player1Name == player2Name)
        {
            alert("Los jugadores no pueden llamarse igual");
            return;
        }
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
        this.winner = null;
        this.board.clearBoard();
        this.messageBox = new MessageBox();
    }

    resetGameProperties()
    {
        clearInterval(this.timerClock);
        this.board.clearBoard();
        this.timer.resetTimer();
        this.renderTimer();
    }

    loadMenu()
    {
        generateLeaderBoardTable();
        this.menu.style.display = "";
        this.gameBoard.style.display = "none";
    }

    start()
    {
        if (!this.playersManager.ready)
        {
            return;
        }
        this.menu.style.display = "none";
        this.gameBoard.style.display = "";
        this.turnTxt.innerText = "Turno de jugador: " + this.playersManager.currentPlayer.getName();
        this.timerClock = setInterval(this.renderTimer.bind(this), 1000);
    }

    gameOver()
    {
        this.resetGameProperties();
        this.generateMatchData();
        this.loadMenu();
        this.messageBox.sendMessage();
    }

    giveUp()
    {
        this.winner = this.playersManager.getOppositePlayer().getName();
        this.messageBox.setMessage("Ganador: " + this.winner + '!');
        this.gameOver();
    }

    renderTimer()
    {
        this.checkTimerNotZero();
        let timerMinutesStr = parseInt(this.timer.getTimer() / 60).toString().padStart(2, '0');
        let timerSecondsStr = (this.timer.getTimer() % 60).toString().padStart(2, '0');
        let timerStr = "Timer " + timerMinutesStr + ":" + timerSecondsStr;
        document.getElementById("timer").innerHTML = timerStr;
        this.timer.substractTimer();
    }

    checkTimerNotZero()
    {
        if (this.timer.getTimer() == 0)
        {
            this.winner = TIE;
            this.messageBox.setMessage("Se acabo el tiempo! Es un empate!");
            this.gameOver();
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
        if (this.board.isAWinner(this.playersManager.currentPlayer.getSymbol()))
        {
            this.winner = this.playersManager.currentPlayer.getName();
            this.messageBox.setMessage("Ganador: " + this.winner + '!');
            this.gameOver();
        }
        else if (this.board.areAllSlotsFull())
        {
            this.winner = TIE;
            this.messageBox.setMessage("Empate!");
            this.gameOver();
        }
        else
        {
            this.playersManager.switchTurn();
            this.turnTxt.innerText = "Turno de jugador: " + this.playersManager.currentPlayer.getName();
        }
    }

    generateMatchData()
    {
        let match = new Match(this.playersManager.players[X].getName(),
                              this.playersManager.players[O].getName(),
                              this.winner);
        saveMatchData(match);
    }
}

class Match
{
    constructor(player1, player2, winner)
    {
        this.player1 = player1;
        this.player2 = player2;
        this.winner = winner;
    }
}

class MessageBox
{
    constructor()
    {
        this.message = "";
        this.element = document.getElementById("message-box");
        this.messageText = document.getElementById("message-box-text");
    }
    sendMessage()
    {
        this.element.style.display = "inline-block";
    }
    hideMessage()
    {
        this.element.style.display = "none";
    }
    setMessage(message)
    {
        this.messageText.innerText = message;
    }
}

function getMatchesData()
{
    let matchesData = JSON.parse(localStorage.getItem(KEY_MATCHES_SAVE));
    if (matchesData == null)
    {
        matchesData = [];
    }
    return matchesData;
}

function saveMatchData(matchData)
{
    let currentDataSaved = JSON.parse(localStorage.getItem(KEY_MATCHES_SAVE));
    if (currentDataSaved == null)
    {
        let newMatchesList = JSON.stringify([matchData]);
        localStorage.setItem(KEY_MATCHES_SAVE, newMatchesList);
    }
    else
    {
        currentDataSaved.push(matchData);
        currentDataSaved = JSON.stringify(currentDataSaved);
        localStorage.setItem(KEY_MATCHES_SAVE, currentDataSaved);
    }
}

function generateLeaderBoardTable()
{
    let matchesData = getMatchesData();
    let tableElement = document.getElementById('leaderboard');

    tableElement.innerHTML = '';

    let tableHeader = tableElement.createTHead();
    let headerRow = tableHeader.insertRow();
    let headerCell = headerRow.insertCell();

    headerCell.innerText = "Jugador 1"
    headerCell = headerRow.insertCell();
    headerCell.innerText = "Jugador 2"
    headerCell = headerRow.insertCell();
    headerCell.innerText = "Ganador"

    let tableBody = tableElement.createTBody();

    for(let i = 0; i < matchesData.length; i++)
    {
        let tableRow = tableBody.insertRow();
        let jugador1 = tableRow.insertCell();
        let jugador2 = tableRow.insertCell();
        let ganador = tableRow.insertCell();
        jugador1.innerText = matchesData[i]["player1"];
        jugador2.innerText = matchesData[i]["player2"];
        ganador.innerText = matchesData[i]["winner"];
    }
}
