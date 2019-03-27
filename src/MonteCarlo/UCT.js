let UCT = {
  /**
   * Calculate the UCT (Upper Confidence Bound) value of Node
   * @param {Number} totalVisit - total number of simulations for the parent node
   * @param {Number} nodeWinScore - number of wins after the i-th move
   * @param {Number} nodeVisit - number of simulations after the i-th move
   * @return {Number} UCT of Node
   */
  uctValue: (totalVisit, nodeWinScore, nodeVisit) => {
    if (nodeVisit === 0) {
      return Number.MAX_SAFE_INTEGER;
    }
    return (
      nodeWinScore / nodeVisit +
      1.41 * Math.sqrt(Math.log(totalVisit) / nodeVisit)
    );
  },

  /**
   * Find the child Node with the highest UCT
   * @param {Node} node - current node
   * @return {Node} most promising node
   */
  findBestNodeWithUCT: node => {
    let parentVisit = node.state.visitCount;
    let childUCT = [];

    // Find the UCT of each child of the Array
    node.childArray.forEach(child => {
      childUCT.push(
        UCT.uctValue(parentVisit, child.state.winScore, child.state.visitCount)
      );
    });
    // Find the highest UCT value and index of value
    var max = Math.max(...childUCT);
    var idx = childUCT.indexOf(max);
    return node.childArray[idx];
  }
};

export default UCT;
