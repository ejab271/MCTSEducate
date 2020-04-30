import Board from './Board';
import MonteCarloTreeSearch from '../MonteCarlo/MonteCarlo';
import GameLogic from '../GameLogic';

let humanBattle=null;
let AIBattle = null;

let simulateAiPlay = () => {
  let board = new Board();
  let player = 1;
  let totalMoves = 9;
  for (var i = 0; i < totalMoves; i++) {
    board = MonteCarloTreeSearch.findNextMove(board, player, 0.5)
    
    
    if (board.checkStatus() !== -1) {
      break;
    }
    player = 3-player;
    console.log(board.boardValues);
  
    
  }
  let winStatus = board.checkStatus();
  console.log();
  winStatus === 1
    ? console.log(`player 1 wins`)
    : winStatus === 2
      ? console.log(`player 2 wins`)
      : console.log(`draw`);

  while (board.boardValues.length) {
    console.log(board.boardValues.splice(0, 3));
    
  }
  return winStatus;
};

/*let AIPlay = () =>{
  let board = new Board();
  let oldboard = new Board();
  let player = 1;
  let totalMoves = 9;
  let change ;
  let mcts1 = MonteCarloTreeSearch;
  let checkChanges =() => {
    console.log(oldboard.boardValues);

    for (var k = 0; k< totalMoves; k++){
    if(oldboard.boardValues[k] ===board.boardValues[k] ){
    }
    else{
      console.log(k);
      oldboard.boardValues[k] = board.boardValues[k]
      //change.push(k);
     change = k;
      return change;
    }
  }

}

  for (var i = 0; i < totalMoves; i++) {
    board = MonteCarloTreeSearch.findNextMove(board, player, 0.5);
    checkChanges();
    return change;

    if (board.checkStatus() !== -1) {
      break;
    }
    player = 3-player;
    console.log(board.boardValues);
    
  }
  //return change;
  let winStatus = board.checkStatus();
  console.log();
  winStatus === 1
    ? console.log(`player 1 wins`)
    : winStatus === 2
      ? console.log(`player 2 wins`)
      : console.log(`draw`);

  while (board.boardValues.length) {
    console.log(board.boardValues.splice(0, 3));
  }
  
  
  
};*/
function homanMove(action){
  if(humanBattle){
    console.log("hi");
    return humanBattle.humanMove(action);
  }
}

function AIMove(action){
  if(AIBattle){
    return AIBattle.letAIPlayMove(action);
  }
}

let AIPlay = () => {
let board = new Board();
let player = 1;
let mctse = MonteCarloTreeSearch;


 humanBattle = new GameLogic(player,board,mctse);
const action = humanBattle.playNewGameWithAI();

return action;
};

let BotPlay = () => {
  let board =new Board();
  let player =1 ;
  let mctse = MonteCarloTreeSearch;
  
  AIBattle = new GameLogic(player,board,mctse);
  const action = AIBattle.letRikuMove();
  
  return action;
  };

//export default simulateAiPlay;
export {simulateAiPlay, homanMove,AIPlay,BotPlay, AIMove};
