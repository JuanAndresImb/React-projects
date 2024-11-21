import { useState } from "react"
import confetti from "canvas-confetti"

import { Square } from "./components/Square.jsx"
import { TURNS } from "./components/Constants.jsx"
import { checkWinnerFrom } from "./Logic/board.js"
import { WinnerModal } from "./components/WinnerModal.jsx"

function App() {

  const [board, setBoard] = useState(
  Array(9).fill(null)
  )
  const [turn, setTurn] = useState(TURNS.X)

  const [winner, setWinner] = useState(null)

  
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    
  }
  //updateBoard function is going to be passed as a prop to the square component
  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square === null)
  }
  const updateBoard = (index) => {
    if (board[index]) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    //your turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    //checking for a winner 
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      confetti()
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }
 
  return (
  <main className='board'>
      <h1> Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset</button>
    <section className="game">
        {
          board.map((_, index) => {
            return (
              //square represents each square in the board that is being mapped and is going to be rendered 
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard} //passing as a prop to the square component
            >
              {board[index]}
              
            </Square>
          )
          
        })
      }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
 } 

export default App
