import Utils from "./Utils";




let mctsValue = null;

export default class GameLogic{

constructor(player,board,mctse){
    console.log('tester');
    this.board = board;
    this.player= 3 - player;
    this.mcts= mctse;
}
// AIvsPlayer
playNewGameWithAI(){
this.player = 3 - this.player

return this.letAIPlayMove();
}
playNewGameWithBot(){
    this.player = 3 - this.player
    
    return this.letSoraMove();
    }

letAIPlayMove(){
   // debugger;
let action = -1;
let data ;
let boardCheck;
let winningsimus;
console.log("letAIPlayMove");
if(this.player === 1){
    console.log("AI 1 is Playing")
    //AI 1
    if(this.board.checkStatus() === -1){
        mctsValue= this.mcts.findNextMove(this.board,this.player,0.5);
        //data =mctsValue.promising;
        boardCheck = mctsValue.promising;
        winningsimus = mctsValue.simus;

       // console.log(mctsValue);
        //data.sort(function(a,b){return b-a});
        //console.log("amount of moves made: " ,data);
        //console.log("The Simulatioooooons!!!!!:" ,boooard);
        console.log("winningSimulation", winningsimus);
       // console.log("winningNode", mctsValue.winningNode);
        

        action = Utils.checkChanges(this.board.boardValues, mctsValue.winningNode.boardValues);
        data = this.board.boardValues;
        console.log("PrevBoard", data);
        this.board.boardValues = mctsValue.winningNode.boardValues;
       // console.log("action:", action);
     
    }
}
else {
console.log("current player is homan");
}
this.player = 3 - this.player;
return {"action": action, "data": winningsimus, "prevBoard": data, "boardCheck":boardCheck }
//return action;


}



humanMove(action){
   // debugger;
    console.log("Homan is moving");
    console.log("current Player:"+this.player);
    
    let aiAction =-1;
    if (this.player === 1){
        console.log("Current Player is AI");
        return aiAction;
    }

    if(this.board.checkStatus() !== -1){
        console.log("Game is Over what chu doing");
    }
    
    this.board.performMove(this.player,action);
    
    this.player = 3 - this.player;
    aiAction = this.letAIPlayMove();
   
    return aiAction;
}

}