export default class Board {
  //need to work on
  constructor(board) {
    if (arguments.length === 1) {
      this.boardValues = board.boardValues.slice();
    } else {
      this.boardValues = new Array(9);
      for (var i = 0; i < this.boardValues.length; i++) {
        this.boardValues[i] = 0;
      }
    }
    this.DEFAULT_BOARD_SIZE = 3;
    this.IN_PROGRESS = -1;
    this.DRAW = 0;
    this.P1 = 1;
    this.P2 = 2;
    this.totalMoves = 0;
  }

  /**
   * Add a move to the board
   * @param {Number} player - the player number
   * @param {Number} p - position of the move
   */
  performMove(player, p) {
    this.totalMoves++;
    this.boardValues[p] = player;
  }

  /**
   * Finds all empty positions on a board
   * @return {Array} possible moves
   */
  getEmptyPositions() {
    let size = this.boardValues.length;
    let emptyPositions = [];
    for (var i = 0; i < size; i++) {
      if (this.boardValues[i] === 0) {
        emptyPositions.push(i);
      }
    }
    return emptyPositions;
  }

  /**
   * Checks status of the game
   * @return {Number}
   * -1  - game incomplete
   *  0  - draw
   *  1  - player 1 wins
   *  2  - player 2 wins
   */
  checkStatus() {
    // all possible winning combinations in Tic Tac Toe
    let checks = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (var i = 0; i < checks.length; i++) {
      let check = checks[i];
      let checkArr = [];
      for (var j = 0; j < check.length; j++) {
        checkArr.push(this.boardValues[check[j]]);
      }

      function winner1(currentValue) {
        return currentValue === 1;
      }

      function winner2(currentValue) {
        return currentValue === 2;
      }
      if (checkArr.every(winner1)) {
        return 1;
      }
      if (checkArr.every(winner2)) {
        return 2;
      }
    }

    function incomplete(elem) {
      return elem === 0;
    }
    if (this.boardValues.some(incomplete)) {
      return -1;
    }

    // if there are no empty spaces, the game is a draw
    return 0;
  }
}
