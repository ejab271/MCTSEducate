import State from './State';

export default class Node {
  constructor(state, node) {
    if (arguments.length === 1) {
      this.state = state;
      this.parent = this.parent;
      this.childArray = [];
    } else if (arguments.length === 2) {
      this.state = new State(null, node.state);
      if (node.parent !== (null || undefined)) {
        this.parent = node.parent;
      }
      this.childArray = [];
      // let childArray = node.childArray;
      node.childArray.forEach(child => {
        this.childArray.push(new Node(null, child));
      });
    } else {
      this.state = new State();
      this.parent = this.parent;
      this.childArray = [];
    }
  }

  /**
   * Find a random Child Node
   * @return {Node} child node
   */
  getRandomChildNode() {
    return this.childArray[Math.floor(Math.random() * this.childArray.length)];
  }

  getChildWithMaxScore() {
    let arrScore = [];
    for (var i = 0; i < this.childArray.length; i++) {
      arrScore.push(this.childArray[i].state.visitCount);
    }
    var largest = Math.max(...arrScore);
    var idx = arrScore.indexOf(largest);
    return this.childArray[idx];
  }
}
