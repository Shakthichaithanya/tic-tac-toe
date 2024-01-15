import { useState } from "react"
import Gameboard from "./components/Gameboard"
import Players from "./components/Players"
import { WINNING_COMBINATION } from "./data/data"
import GameOver from "./components/GameOver";

const PLAYERS = {
  X: "player 1",
  O: "player 2"
}
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveWinner(gameBoard,players){
let winner;
for(const combination of WINNING_COMBINATION){
  const firstSquare = gameBoard[combination[0].row][combination[0].col]
  const secondSquare = gameBoard[combination[1].row][combination[1].col]
  const thirdSquare = gameBoard[combination[2].row][combination[2].col]

  if(firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare){
    winner = players[firstSquare];
  }
}
return winner;
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...initialGameBoard.map((innerArray) => [...innerArray])]

  for(const turn of gameTurns){
    const {square, player} = turn;
    const {row,col} = square;
    gameBoard[row][col] = player;
  }

  return gameBoard;
}
function getCurrentActivePlayer(gameTurns) {
  let currentPlayer = 'X'
      if(gameTurns.length>0 && gameTurns[0].player === 'X'){
        currentPlayer = 'O'
      }

      return currentPlayer;
    }

function App() {
  const [players, setPlayers] = useState(PLAYERS)
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = getCurrentActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard,players)
  

  const hasDraw = gameTurns.length === 9 && !winner
  function handleSelectSquare(rowIndex, colIndex){
    setGameTurns((prevsTurns) => {
      const currentPlayer = getCurrentActivePlayer(prevsTurns);
      const updatedTurns = [{ square :{row: rowIndex,col:colIndex},player:currentPlayer}, ...prevsTurns];
      return updatedTurns;
    })

  }

  function handlePlayerChange(symbol, newName){
    setPlayers(prevPlayer => {
      return({
        ...prevPlayer,
        [symbol]: newName
      })
    })
  }

  function handleRematch(){
    setGameTurns([]);
  }
  return (
    
    <main id="game-container">
      <ol id="players" className="highlight-player">
        <Players playerName={PLAYERS.X} playerSymbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerChange}/>
        <Players playerName={PLAYERS.O} playerSymbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerChange}/>
      </ol>
      {(winner || hasDraw) && <GameOver winner  = {winner} onRematch={handleRematch}/>}
      <Gameboard onSelectSquare = {handleSelectSquare} activePlayerSymbol ={activePlayer} board={gameBoard} />
    </main>
  )
}

export default App
