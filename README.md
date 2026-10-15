# Tic Tac Toe Game Board Representation

A game board is represented by a 4 x 4 grid of number 1, number 2, or null.  Example:

```typescript
const game = [
  [1,    null, null, null],
  [2,    null, null, null],
  [1,    null, null, null],
  [null, null, null, null],
]
```

# AI Use

The code was written entirely by hand initially. I then asked AI to look for any issues and fixed some of them manually. Transcript is located in `ai-session.txt`

# Running Tests

```bash
npm install
npm test
```

# Exercise Prompt

Implement a 4x4 Tic-Tac-Toe/Connect Four solver. The program should take in a representation of a 4x4 board, and tell you the winner if any.
Victory is determined by one of five conditions:

Vertical
Horizontal
Diagonal
All Four Corner
2x2 box
Implementing a UI is not necessary: we are only interested in your implementation of the win condition.
Implement the below functions, and feel free to create any other types that you need, as well as unit tests (just tell us how to run them!). If you use AI please include your AI session transcripts.

```typescript
class TicTacToe {
  public checkWinner(/*{{ params, if any }} _/): /_{{ return type }}*/ {};

  public anyMovesLeft(/* {{ params, if any }} */): /*{{ return type }}*/ {};

  public isGameOver(/* {{ params, if any }} */): /*{{ return type }}*/ {};
}
```
