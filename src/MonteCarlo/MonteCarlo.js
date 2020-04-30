//import Board from '../TicTacToe/Board';
import Node from './Node';
import Tree from './Tree';
import UCT from './UCT';


let MonteCarloTreeSearch = {
  // constructor() {
  //   this.WIN_SCORE = 10;
  //   this.level;
  //   this.opponent;
  // }

  /**
   * Find best next move for player
   * @param {Board} board - the current state of the board
   * @param {Number} playerNo - player
   */
  findNextMove: (board, playerNo, timeout = 3) => {
    let opponent = 3 - playerNo;
    let tree = new Tree();
    let rootNode = tree.root;
    let promisingNode;
    let dtest = [];
    let dtest2 = [];
    rootNode.state.board = board;
    rootNode.state.playerNo = opponent;

    // while loop runs for 500 milliseconds
    let end = Date.now() + timeout * 3000;
    while (Date.now() < end) {
     promisingNode = selectPromisingNode(rootNode);
     
     dtest.push(checkMoves(promisingNode));
      // if status of board is -1, game has not finished yet
      if (promisingNode.state.board.checkStatus() === board.IN_PROGRESS) {
        expandNode(promisingNode);
      }
      let nodeToExplore = promisingNode;
      if (nodeToExplore.childArray.length > 0) {
        nodeToExplore = promisingNode.getRandomChildNode();
        dtest2.push(promisingNode.getRandomChildNode());
      }
      let playoutResult = simulateRandomPlayout(nodeToExplore, opponent);
      
      backPropogation(nodeToExplore, playoutResult);
    }

    let winnerNode = rootNode.getChildWithMaxScore();
    tree.root = winnerNode;


    return { "promising": winnerNode,"boooard":dtest2, "winningNode":winnerNode.state.board , "simus": winnerNode.parent}
    //return winnerNode.state.board;
  },

};

/**
 * Selection Phase
 * Starting with the root node, picks the node with the maximum win rate
 */

/**
 * Finds the most promising node
 * @param {Node} rootNode - the node we start out at
 * @return {Node} most promising node
 */
let selectPromisingNode = rootNode => {
  let node = rootNode;
  while (node.childArray.length !== 0) {
    node = UCT.findBestNodeWithUCT(node);
  }
  return node;
};

/**
 * Recommendation Phase
 * Recommends a leaf node to be expanded upon
 */

/**
 * Find the child Node with the highest UCT
 * @param {Node} node - current node
 * @return {Node} most promising node
 */
let expandNode = node => {
  let possibleStates = node.state.getAllPossibleStates();
  possibleStates.forEach(state => {
    let newNode = new Node(state);
    newNode.parent = node;
    newNode.state.playerNo = node.state.getOpponent();
    node.childArray.push(newNode);
  });
};

/**
 * Proprogate function to update score and visit count from leaf to root
 * @param {Node} nodeToExplore - node coming back from
 * @param {Number} playerNo - player whose turn it is
 */
let backPropogation = (nodeToExplore, playerNo) => {
  let tempNode = nodeToExplore;
  while (tempNode !== undefined) {
    tempNode.state.visitCount++;
    if (tempNode.state.playerNo === playerNo) {
      tempNode.state.addScore(1);
     // tempNode.state.board.totalMoves++;
    }
    tempNode = tempNode.parent;
  }
};

let simulateRandomPlayout = (node, opponent) => {
  let tempNode = new Node(null, node);
  let tempState = tempNode.state;
  let boardStatus = tempState.board.checkStatus();

  if (boardStatus === opponent) {
    tempNode.parent.state.winScore = Number.MIN_SAFE_INTEGER;
    return boardStatus;
  }
  while (boardStatus === -1) {
    tempState.togglePlayer();
    tempState.randomPlay();
    
    tempState.board.totalMoves++;
    boardStatus = tempState.board.checkStatus();
    //console.log(tempState.board.checkStatus());
  }
  return boardStatus;
};

let getStats = (rootNode) => {
  let node = this.nodes.get(rootNode.hash())
  let stats = { n_plays: node.n_plays, n_wins: node.n_wins, children: [] }
  for (let child of node.children.values()) {
    if (child.node === null) stats.children.push({ play: child.play, n_plays: null, n_wins: null})
    else stats.children.push({ play: child.play, n_plays: child.node.n_plays, n_wins: child.node.n_wins})
    console.log (stats.children.push({ play: child.play, n_plays: child.node.n_plays, n_wins: child.node.n_wins}));
  }
  return stats
}

let checkMoves = (promisingNode) => {
  let node = promisingNode.state.board;
  let moves = 9;
  for(var i = 0; i < node.boardValues.length; i ++){
    if( node.boardValues[i] !== 0){
      moves --;
    }
  }
  return moves;
}


export default MonteCarloTreeSearch;
