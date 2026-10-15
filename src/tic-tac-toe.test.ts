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

  test("valid game", () => {
    const game: Cell[][] = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
    expect(() => new TicTacToe("X", "O", game)).not.toThrow();
  });

  test("invalid game, player1 name length", () => {
    const game: Cell[][] = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
    expect(() => new TicTacToe("", "O", game)).toThrow(
      "Invalid game: Both players must have a unique name at least 1 character long",
    );
  });

  test("invalid game, player2 name length", () => {
    const game: Cell[][] = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
    expect(() => new TicTacToe("X", "", game)).toThrow(
      "Invalid game: Both players must have a unique name at least 1 character long",
    );
  });

  test("invalid game, players have same name", () => {
    const game: Cell[][] = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
    expect(() => new TicTacToe("X", "X", game)).toThrow(
      "Invalid game: Both players must have a unique name at least 1 character long",
    );
  });

  test("invalid game, too few rows", () => {
    const game: Cell[][] = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
    expect(() => new TicTacToe("X", "O", game)).toThrow(
      "Invalid game: The game grid must be 4x4",
    );
  });

  test("invalid game, too few columns", () => {
    const game: Cell[][] = [
      [null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
    expect(() => new TicTacToe("X", "O", game)).toThrow(
      "Invalid game: The game grid must be 4x4",
    );
  });

  test("invalid game, too many columns", () => {
    const game: Cell[][] = [
      [null, null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
    expect(() => new TicTacToe("X", "O", game)).toThrow(
      "Invalid game: The game grid must be 4x4",
    );
  });

  test("invalid game, too many rows", () => {
    const game: Cell[][] = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ];
    expect(() => new TicTacToe("X", "O", game)).toThrow(
      "Invalid game: The game grid must be 4x4",
    );
  });

  test("invalid game, both players have win conditions", () => {
    const game1: Cell[][] = [
      [1, 2, null, null],
      [1, 2, null, null],
      [1, 2, null, null],
      [1, 2, null, null],
    ];
    expect(() => new TicTacToe("X", "O", game1)).toThrow(
      "Invalid game: Both players have win conditions",
    );
    const game2: Cell[][] = [
      [2, 1, null, null],
      [2, 1, null, null],
      [2, 1, null, null],
      [2, 1, null, null],
    ];
    expect(() => new TicTacToe("X", "O", game2)).toThrow(
      "Invalid game: Both players have win conditions",
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

  test.for<Cell[][]>([
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
  ])("Vertical winners, col %#", (game: Cell[][]) => {
    const ticTacToe = new TicTacToe("X", "O", game);
    expect(ticTacToe.checkWinner()).toBe("X");
  });

  test.for<Cell[][]>([
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
  ])("Horizontal winners, row %#", (game: Cell[][]) => {
    const ticTacToe = new TicTacToe("X", "O", game);
    expect(ticTacToe.checkWinner()).toBe("X");
  });

  test.for<Cell[][]>([
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
  ])("Diagonal winners, diagonal %#", (game: Cell[][]) => {
    const ticTacToe = new TicTacToe("X", "O", game);
    expect(ticTacToe.checkWinner()).toBe("O");
  });

  test.for<Cell[][]>([
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
  ])("Box winners, box %#", (game: Cell[][]) => {
    const ticTacToe = new TicTacToe("X", "O", game);
    expect(ticTacToe.checkWinner()).toBe("O");
  });

  test.for<Cell[][]>([
    [
      [2, 1, 2, 2],
      [1, 1, 2, 1],
      [2, 1, 1, 1],
      [2, 2, 1, 2],
    ],
  ])("Corner winner", (game: Cell[][]) => {
    const ticTacToe = new TicTacToe("X", "O", game);
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
