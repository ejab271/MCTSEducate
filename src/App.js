import React, { Component } from 'react';
import './App.css';
import { Checkbox, Button, ModalActions } from 'semantic-ui-react';
//import simulateAIPlay, { BotPlay } from './TicTacToe/gameTTT';
import {homanMove,AIMove,AIPlay} from './TicTacToe/gameTTT';
import GameLogic from './GameLogic';
import TreeView from './TicTacToe/TreeView';
import Data from './TicTacToe/Data';
import {Tree, treeUtil} from 'react-d3-tree';
import simus from './MonteCarlo/MonteCarlo';


let dataItems = {};
dataItems = {
  childArray: [],
  parent: {},
  state: {
    board: {
      DEFAULT_BOARD_SIZE: 3,
      DRAW: 0,
      IN_PROGRESS: -1,
      P1: 1,
      P2: 2,
      boardValues: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      totalMoves: 0
    },
    playerNo: 1,
    visitCount: 0,
    winscore: 0
  }
};

const myTreeData = [
  {
    name: dataItems.state.board.boardValues.toString(),
    attributes: {
      visitCount: dataItems.state.visitCount,
      winscore: dataItems.state.winscore,
      playersTurn: dataItems.state.playerNo
    },
    children: []
  }
];


    const Node = {
      "childArray": [],
      "Parent": { 
          "Node": {
              "childArray": [],
              "Parent": {},
              "state": {
                          "board":
                              {
                                  "DEFAULT_BOARD_SIZE": 3,
                                  "DRAW": 0,
                                  "IN_PROGRESS": -1,
                                  "P1": 1,
                                  "P2": 2,
                                  "boardValues": [0, 0, 0, 0, 0, 0, 0, 0, 0],
                                  "totalMoves": 1
                              },
                      "playerNo": 1,
                      "visitCount":1000,
                      "winscore": 950  
                  }
              }
          },
      "state": {
          "board": {
              "DEFAULT_BOARD_SIZE": 3,
              "DRAW": 0,
              "IN_PROGRESS": -1,
              "P1": 1,
              "P2": 2,
              "boardValues": [0, 0, 0, 0, 1, 0, 0, 0, 0],
              "totalMoves": 1
          },
          "playerNo": 1,
          "visitCount":100,
          "winscore": 80  
      }
  }
  const dataItemss = {
      "Node": 
        {
          "childArray": [Node, Node, Node],
          "state": {
              "board":   {"DEFAULT_BOARD_SIZE": 3,
                              "DRAW": 0,
                          "IN_PROGRESS": -1,
                          "P1": 1,
                          "P2": 2,
                          "boardValues": [0, 0, 0, 0, 1, 0, 0, 0, 0],
                          "totalMoves": 1
                              },
              "playerNo": 1,
              "visitCount":100,
              "winscore": 80  
          }
      }
  }

  const svgSquare = {
    shape: 'circle',
    shapeProps: {
      r: "10",
      stroke: 'black',
      strokeWidth: 2
    }
  }

 
    
  
    
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enabledAI: true,
      enableBots:false,
      aiFirst: true,
      data: dataItems,
      treeData:myTreeData,
      prevBoard:dataItems.state.board.boardValues,
      boardCheck:dataItems
    };
    
    
    this.changeData= this.changeData.bind(this);
  }
  formatTreeData = () => {
    console.log("start render");
    const done = createNode(this.state.data,this.state.prevBoard);
    console.log("done");
    this.setState({ treeData: done });
  };
  changeData(data){
    this.setState({data});
  }
  toggleAI = () => {
    this.setState({ enabledAI: !this.state.enabledAI });
  };
  toggleBots = () => {
    this.setState({ enableBots: !this.state.enableBots });
  };

  handleClick = action => {
    console.log('handleClick', action);
    // console.log('data', action.data)
    // this.setState({data: action.data},
    //   this.formatTreeData());
    const test = homanMove(action);
    console.log("board",test.boardCheck);
    this.setState({data: test.data, prevBoard: test.prevBoard, boardCheck: test.boardCheck},this.formatTreeData());
    return test.action;
    
   
  };
 
  simulateAI= () =>{
    console.log('start new game');
    let action;
    if (this.state.enabledAI) {
      alert('ai is on');
      var AI = AIPlay();
      alert(AI);
    }

    this.setState((prevState, props) => ({ aiFirst: !prevState.aiFirst }));

    if (action >= 0) {
      console.log('ai starts at:', action);
      return action;
    }
    return -1;
  };
  

  startNewGame = () => {
    console.log('start new game');
    let action;
    if (this.state.enableBots) {
     // alert('ai is on');
     // action = BotPlay(this.state.aiFirst);
      
    }
    if (this.state.enabledAI) {
      // alert('ai is on');
       action = AIPlay(this.state.aiFirst);
       
     }

    this.setState((prevState, props) => ({ aiFirst: !prevState.aiFirst }));

    if (action.action >= 0) {
      console.log('ai starts at:', action.action);
      console.log("startNewGame", action.data);
      console.log("startNewGameBoard", action.boardCheck);
      this.setState({data: action.data, prevBoard: action.prevBoard, boardCheck: action.boardCheck},
      this.formatTreeData());
      

      
      //console.log("after calling setState: ", this.state.data);

      return action.action;
    }
    return -1;
  };
 


  render() {
    //console.log(generated);
   //dataItems= this.state.data;
    console.log("Data before render:",this.state.data);
    console.log("DataItems before render:",this.state.treeData);
  
   
    
      return (
        <div
          className="App"
          style={{ display: 'inline-block', justifyContent: 'center' }}
        >
          <div>
            <h3>Tic Tac Toe</h3>
          </div>
         {/* <div>
            {'Player vs AI'}
            <Checkbox
              label="Enable MCTS AI"
              onChange={this.toggleAI}
              checked={this.state.enableAI}
            />
            <p></p>
          </div>
          <div>
            {'AI vs AI '}
            <Checkbox
              label="Enable MCTS Bots"
              onChange={this.toggleBots}
              checked={this.state.enableBots}
            />
            <p></p>
        </div> */}
  
          <br />
        
          <div id="treeWrapper" style={{width: '65em', height: '45em'}}>

<Tree data={this.state.treeData} orientation= "vertical"  nodeSvgShape={svgSquare}/>

</div>
    	
          <div>
        
          <TicTacToeApp
              handleClick={this.handleClick}
              startNewGame={this.startNewGame}
              formatTreeData={this.formatTreeData}
            />
          </div>
          
        </div>
       
      );
      
    
      
    }
  }
  

const Square = props => {
  return (
    <button className="button"  data-pro={props.value} onClick={props.onClick}>
      {props.value}
    </button>
  );
};
const Cell = props => {
  return (
    <button className="cell"  data-pro={props.value} onClick={props.onClick}>
      
    </button>
  );
};

class TicTacToeBoard extends Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}

      />
    );
  }
  AIrenderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }
  state = {}
  componentDidMount() {
  // const dimensions = this.treeContainer.getBoundingClientRect();
   /*treeUtil.parseCSV(treeData)
   .then((data) => {
     this.setState({ data })
   })
   .catch((err) => console.error(err));*/
   
   
  }


/* render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div className="test"><TreeView size={[100,100]} /> </div>
      </div>
    );
  }*/
 render(){
    return(
     
    
      <div className="board-row">
      
	<table>
    <tbody>
  <tr>
    <td className="cell" id="0">{this.renderSquare(0)}</td>
    <td className="cell" id="1">{this.renderSquare(1)}</td>
    <td className="cell" id="2">{this.renderSquare(2)}</td>
  </tr>
  <tr>
    <td className="cell" id="3">{this.renderSquare(3)}</td>
    <td className="cell" id="4">{this.renderSquare(4)}</td>
    <td className="cell" id="5">{this.renderSquare(5)}</td>
  </tr>
  <tr>
    <td className="cell" id="6">{this.renderSquare(6)}</td>
    <td className="cell" id="7">{this.renderSquare(7)}</td>
    <td className="cell" id="8">{this.renderSquare(8)}</td>
  </tr>
  </tbody>
</table>

</div>
    );
  
  }
}

class TicTacToeApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  
  handleClick(i, human) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    },this.props.formatTreeData());

    if (human && this.props.handleClick) {
      setTimeout(() => {
        const action = this.props.handleClick(i);
        if (action >= 0) {
          console.log('ai move:', action);

          this.handleClick(action);
        }
      }, 50);
    }
  }

  

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });

    if (this.props.startNewGame) {
      
      
      setTimeout(() => {
        const action = this.props.startNewGame();
        
        if (action.length >= 0) {
          
            this.handleClick(action)
            
          
        }
        else if(action >= 0){
          console.log('ai moves !!!');
          this.handleClick(action);
          
        }
      }, 50);
    }
  }
  
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      if (move !== 0) {
        return null;
      }
      const desc = move ? `Go to move #${move}` : 'Start new game';
      return (
        <li key={move}>
          <Button className="button2" onClick={() => this.jumpTo(move)}>{desc}</Button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div>
        <div className="game-info">
        <div className="game-status">
          {status}
          </div>
          
          <div>
            <ol>{moves}</ol>
          </div>
          
        
        </div>
        <div className="game-board">
          <TicTacToeBoard
            squares={current.squares}
            onClick={i => this.handleClick(i, 1)}
          />
        </div>
        <div>
        </div>
      </div>
    );
  }

 

}
// function getExpected(data) {
//   return createNode(data.Node);
// }


function createNode(data,prevBoard,boardCheck,svgSquare) {
  let size = 3;
  let array= data.state["board"].boardValues;
  let board = prevBoard;
  let check = data.state["board"].boardValues;;
  

  //console.log(board);
  if (calculateCurrentDepth(data) > 5) {
    return [];
  }

  let collapse = true;
  if (data.parent === undefined) {
    collapse = false;
    array = board;
    //array= check.state["board"].boardValues;
  }
  
  //console.log("createNodeBoard",array);
  return {
    name: array.toString(),
    _collapsed: collapse,
    attributes: {
      //board: boardCheck.state,
      playerNo: data.state.playerNo,
      visitCount: data.state.visitCount,
      winscore: data.state.winScore
    },
    children: createChildren(data.childArray)
  };
}

function createChildren(children) {
  let res = [];
  for (var i = 0; i < children.length; i++) {
    let child = children[i];
    res.push(createNode(child));
  }
  return res;
}

function calculateCurrentDepth(node) {
  let depth = 0;
  let currentNode = node;
  
  while (currentNode.parent !== undefined) {
    depth++;
    currentNode = currentNode.parent;
    
  }
  return depth;
}

// const generated = getExpected(dataItemss);
//console.log(generated);

const calculateWinner = squares => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default App;

