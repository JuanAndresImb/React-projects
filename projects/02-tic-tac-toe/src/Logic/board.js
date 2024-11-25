import { WINNER_COMBOS } from "../components/Constants"
export const checkWinnerFrom = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
      
    }
    return null
}
export const checkEndGame = (newBoard) => {
    //if there is a null value in the board, the game is not over
    return newBoard.every((square) => square === null)
  }