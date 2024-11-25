import { useState, useEffect } from "react"

import confetti from "canvas-confetti"

import { Square } from "./components/Square.jsx"
import { TURNS } from "./components/Constants.jsx"
import { checkWinnerFrom, checkEndGame } from "./Logic/board.js"
import { WinnerModal } from "./components/WinnerModal.jsx"
import { saveGameToStorage, resetGameStorage } from "./Logic/storage/index.js"

function App() {

  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  const [winner, setWinner] = useState(null)

  
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }

  //updateBoard function is going to be passed as a prop to the square component
  
  const updateBoard = (index) => {
    if (board[index]) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    //your turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    //checking for a winner 
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      confetti()
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }
  useEffect(() => {
    console.log('useEffect')
  }, [winner]
  )
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
