export type Cell = 1 | 2 | null;

export class TicTacToe {
  private player1: string;
  private player2: string;

  private game: Cell[][];

  public constructor(
    player1: string,
    player2: string,
    game: (1 | 2 | null)[][],
  ) {
    this.player1 = player1;
    this.player2 = player2;
    this.game = game;

    let player1Moves = 0;
    let player2Moves = 0;
    game.forEach((row) => {
      row.forEach((cell) => {
        if (cell === 1) {
          player1Moves++;
        }
        if (cell === 2) {
          player2Moves++;
        }
      });
    });
    if (player1Moves > player2Moves + 1) {
      throw new Error(
        "Invalid game: Player 1 has multiple more moves than player 2",
      );
    }
    if (player2Moves > player1Moves) {
      throw new Error("Invalid game: Player 2 has more moves than player 1");
    }
  }

  public checkWinner(): string | null {
    const g = this.game;
    const verticals: Cell[][] = [[], [], [], []];
    const horizontals: Cell[][] = [[], [], [], []];
    const diagonals: Cell[][] = [
      [g[0][0], g[1][1], g[2][2], g[3][3]],
      [g[0][3], g[1][2], g[2][1], g[3][0]],
    ];
    const corners: Cell[][] = [[g[0][0], g[0][3], g[3][0], g[3][3]]];
    const boxes: Cell[][] = [[], [], [], [], [], [], [], [], []];

    for (let row = 0; row < this.game.length; row++) {
      for (let col = 0; col < this.game[row].length; col++) {
        const cell = this.game[row][col];
        verticals[col].push(cell);
        horizontals[row].push(cell);

        if (row <= 1) {
          if (col <= 1) {
            boxes[0].push(cell);
          }
          if (col >= 1 && col <= 2) {
            boxes[1].push(cell);
          }
          if (col >= 2) {
            boxes[2].push(cell);
          }
        }

        if (row >= 1 && row <= 2) {
          if (col <= 1) {
            boxes[3].push(cell);
          }
          if (col >= 1 && col <= 2) {
            boxes[4].push(cell);
          }
          if (col >= 2) {
            boxes[5].push(cell);
          }
        }

        if (row >= 2) {
          if (col <= 1) {
            boxes[6].push(cell);
          }
          if (col >= 1 && col <= 2) {
            boxes[7].push(cell);
          }
          if (col >= 2) {
            boxes[8].push(cell);
          }
        }
      }
    }

    const wins = [
      ...verticals,
      ...horizontals,
      ...diagonals,
      ...corners,
      ...boxes,
    ];
    let winner: string | null = null;
    wins.forEach((win) => {
      if (win.every((player) => player === 1)) {
        if (winner !== null && winner !== this.player1) {
          throw new Error("both players have win conditions");
        }
        winner = this.player1;
      }
      if (win.every((player) => player === 2)) {
        if (winner !== null && winner !== this.player2) {
          throw new Error("both players have win conditions");
        }
        winner = this.player2;
      }
    });
    return winner;
  }

  public anyMovesLeft(): boolean {
    for (const row of this.game) {
      for (const cell of row) {
        if (cell === null) {
          return true;
        }
      }
    }
    return false;
  }

  public isGameOver(): boolean {
    if (!this.anyMovesLeft()) {
      return true;
    }
    if (this.checkWinner()) {
      return true;
    }
    return false;
  }
}
