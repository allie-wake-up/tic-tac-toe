import { describe, expect, test } from "vitest";
import { TicTacToe, Cell } from "./tic-tac-toe";

describe("constructor", () => {
  test("invalid game, player 1 too many moves", () => {
    const game: Cell[][] = [
      [1, null, null, null],
      [null, null, null, null],
      [1, null, null, null],
      [null, null, null, null],
    ];
    expect(() => new TicTacToe("X", "O", game)).toThrow(
      "Invalid game: Player 1 has multiple more moves than player 2",
    );
  });

  test("invalid game, player 2 too many moves", () => {
    const game: Cell[][] = [
      [null, null, null, null],
      [null, null, null, null],
      [2, null, null, null],
      [null, null, null, null],
    ];
    expect(() => new TicTacToe("X", "O", game)).toThrow(
      "Invalid game: Player 2 has more moves than player 1",
    );
  });
});

describe("checkWinner", () => {
  test("no winner", () => {
    const game: Cell[][] = [
      [1, 1, 2, 1],
      [1, 2, 1, 2],
      [1, 2, 2, 2],
      [2, 1, 1, 2],
    ];
    const ticTacToe = new TicTacToe("X", "O", game);
    expect(ticTacToe.checkWinner()).toBe(null);
  });

  test("no moves", () => {
    const game: Cell[][] = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
    const ticTacToe = new TicTacToe("X", "O", game);
    expect(ticTacToe.checkWinner()).toBe(null);
  });

  test("both players have win conditions", () => {
    const game1: Cell[][] = [
      [1, 2, null, null],
      [1, 2, null, null],
      [1, 2, null, null],
      [1, 2, null, null],
    ];
    let ticTacToe = new TicTacToe("X", "O", game1);
    expect(() => ticTacToe.checkWinner()).toThrow('both players have win conditions');
    const game2: Cell[][] = [
      [2, 1, null, null],
      [2, 1, null, null],
      [2, 1, null, null],
      [2, 1, null, null],
    ];
    ticTacToe = new TicTacToe("X", "O", game2);
    expect(() => ticTacToe.checkWinner()).toThrow('both players have win conditions');
  });

  test.for([
    [
      [1, 2, 2, 1],
      [1, 1, 2, 2],
      [1, 2, 2, 1],
      [1, 2, 1, 2],
    ],
    [
      [2, 1, 2, 2],
      [1, 1, 2, 1],
      [2, 1, 1, 2],
      [1, 1, 2, 2],
    ],
    [
      [2, 1, 1, 2],
      [1, 2, 1, 2],
      [2, 2, 1, 1],
      [1, 2, 1, 2],
    ],
    [
      [2, 2, 1, 1],
      [1, 2, 2, 1],
      [2, 2, 1, 1],
      [2, 1, 2, 1],
    ],
  ])("Vertical winners, col %#", (game: number[][]) => {
    const ticTacToe = new TicTacToe("X", "O", game as Cell[][]);
    expect(ticTacToe.checkWinner()).toBe("X");
  });

  test.for([
    [
      [1, 1, 1, 1],
      [2, 2, 2, 1],
      [1, 1, 2, 2],
      [2, 2, 1, 2],
    ],
    [
      [2, 2, 2, 1],
      [1, 1, 1, 1],
      [2, 2, 2, 1],
      [1, 2, 1, 2],
    ],
    [
      [2, 1, 1, 2],
      [1, 2, 2, 2],
      [1, 1, 1, 1],
      [1, 2, 2, 2],
    ],
    [
      [2, 1, 2, 2],
      [1, 2, 2, 1],
      [2, 2, 1, 2],
      [1, 1, 1, 1],
    ],
  ])("Horizontal winners, row %#", (game: number[][]) => {
    const ticTacToe = new TicTacToe("X", "O", game as Cell[][]);
    expect(ticTacToe.checkWinner()).toBe("X");
  });

  test.for([
    [
      [2, 1, 1, 2],
      [2, 2, 1, 1],
      [1, 2, 2, 1],
      [1, 2, 1, 2],
    ],
    [
      [1, 1, 2, 2],
      [1, 2, 2, 1],
      [2, 2, 1, 1],
      [2, 1, 1, 2],
    ],
  ])("Diagonal winners, diagonal %#", (game: number[][]) => {
    const ticTacToe = new TicTacToe("X", "O", game as Cell[][]);
    expect(ticTacToe.checkWinner()).toBe("O");
  });

  test.for([
    [
      [2, 2, 1, 2],
      [2, 2, 1, 1],
      [1, 1, 2, 1],
      [2, 2, 1, 1],
    ],
    [
      [1, 2, 2, 2],
      [1, 2, 2, 1],
      [2, 2, 1, 1],
      [1, 1, 1, 2],
    ],
    [
      [1, 2, 2, 2],
      [1, 1, 2, 2],
      [2, 2, 1, 1],
      [1, 1, 1, 2],
    ],
    [
      [1, 1, 2, 2],
      [2, 2, 1, 2],
      [2, 2, 1, 1],
      [1, 1, 1, 2],
    ],
    [
      [1, 1, 2, 1],
      [1, 2, 2, 2],
      [2, 2, 2, 1],
      [1, 1, 1, 2],
    ],
    [
      [1, 1, 2, 1],
      [1, 2, 2, 2],
      [2, 1, 2, 2],
      [1, 1, 1, 2],
    ],
    [
      [1, 1, 2, 1],
      [1, 2, 1, 1],
      [2, 2, 1, 2],
      [2, 2, 1, 2],
    ],
    [
      [1, 1, 2, 1],
      [1, 2, 1, 1],
      [1, 2, 2, 2],
      [2, 2, 2, 1],
    ],
    [
      [1, 1, 2, 1],
      [1, 2, 1, 1],
      [1, 2, 2, 2],
      [2, 1, 2, 2],
    ],
  ])("Box winners, box %#", (game: number[][]) => {
    const ticTacToe = new TicTacToe("X", "O", game as Cell[][]);
    expect(ticTacToe.checkWinner()).toBe("O");
  });

  test.for([
    [
      [2, 1, 2, 2],
      [1, 1, 2, 1],
      [2, 1, 1, 1],
      [2, 2, 1, 2],
    ],
  ])("Corner winner", (game: number[][]) => {
    const ticTacToe = new TicTacToe("X", "O", game as Cell[][]);
    expect(ticTacToe.checkWinner()).toBe("O");
  });
});

describe("anyMovesLeft", () => {
  test("no moves left", () => {
    const game: Cell[][] = [
      [1, 1, 2, 1],
      [1, 2, 1, 1],
      [1, 2, 2, 2],
      [2, 1, 2, 2],
    ];
    const ticTacToe = new TicTacToe("X", "O", game);
    expect(ticTacToe.anyMovesLeft()).toBe(false);
  });

  test("moves left", () => {
    const game: Cell[][] = [
      [1, 1, 2, 1],
      [1, 2, 1, 1],
      [1, 2, 2, 2],
      [2, 1, 2, null],
    ];
    const ticTacToe = new TicTacToe("X", "O", game);
    expect(ticTacToe.anyMovesLeft()).toBe(true);
  });
});

describe("isGameOver", () => {
  test("no moves left, no winners", () => {
    const game: Cell[][] = [
      [1, 1, 2, 1],
      [1, 2, 1, 2],
      [1, 2, 2, 2],
      [2, 1, 1, 2],
    ];
    const ticTacToe = new TicTacToe("X", "O", game);
    expect(ticTacToe.checkWinner()).toBe(null);
    expect(ticTacToe.isGameOver()).toBe(true);
  });

  test("moves left, no winners", () => {
    const game: Cell[][] = [
      [1, 1, 2, 1],
      [1, 2, 1, 1],
      [1, 2, 2, 2],
      [2, 1, 2, null],
    ];
    const ticTacToe = new TicTacToe("X", "O", game);
    expect(ticTacToe.anyMovesLeft()).toBe(true);
    expect(ticTacToe.checkWinner()).toBe(null);
    expect(ticTacToe.isGameOver()).toBe(false);
  });

  test("moves left, winner", () => {
    const game: Cell[][] = [
      [1, 1, 2, 1],
      [1, 2, 1, 2],
      [1, 2, 2, 2],
      [1, 2, 1, null],
    ];
    const ticTacToe = new TicTacToe("X", "O", game);
    expect(ticTacToe.anyMovesLeft()).toBe(true);
    expect(ticTacToe.checkWinner()).toBe("X");
    expect(ticTacToe.isGameOver()).toBe(true);
  });
});
