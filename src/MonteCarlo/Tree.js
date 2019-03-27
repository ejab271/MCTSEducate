import Node from './Node';

export default class Tree {
  constructor(node) {
    if (arguments.length === 1) {
      this.root = node;
    } else {
      this.root = new Node();
    }
  }
}
