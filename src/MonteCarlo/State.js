import Board from '../TicTacToe/Board';

export default class State {
  constructor(board, state) {
    if (arguments.length === 1) {
      this.board = new Board(board);
      this.playerNo = this.playerNo;
      this.visitCount = 0;
      this.winScore = 10;
    } else if (arguments.length === 2) {
      this.board = new Board(state.board);
      this.playerNo = state.playerNo;
      this.visitCount = state.visitCount;
      this.winScore = state.winScore;
    } else {
      this.board = new Board();
      this.playerNo = this.playerNo;
      this.visitCount = 0;
      this.winScore = 10;
    }
  }

  /**
   * Get all possible future states of a board
   * @return {Array} all possible next move states
   */
  getAllPossibleStates() {
    let possibleStates = [];
    let availablePositions = this.board.getEmptyPositions();

    // create an array of all the possible states a board can become
    availablePositions.forEach(p => {
      let newState = new State(this.board);
      newState.playerNo = 3 - this.playerNo;
      newState.board.performMove(newState.playerNo, p);
      possibleStates.push(newState);
    });

    return possibleStates;
  }

  /**
   * Plays a random move on the board
   */
  randomPlay() {
    let availablePositions = this.board.getEmptyPositions();
    let totalPossibilities = availablePositions.length;
    let rdm = Math.floor(Math.random() * totalPossibilities);
  
    this.board.performMove(this.playerNo, availablePositions[rdm]);
   
  }

  //TODO
  /**
   * Changes the current player
   */
  togglePlayer() {
    this.playerNo = 3 - this.playerNo;
  }

  /**
   * Returns the opponent
   */
  getOpponent() {
    return 3 - this.playerNo;
  }

  addScore(score) {
    if (this.winScore !== Number.MIN_SAFE_INTEGER) {
      this.winScore += score;
    }
  }
}
