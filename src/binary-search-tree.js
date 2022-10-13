const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.tree = null;
  }

  root() {
    return this.tree;
  }

  add(data) {
    this.tree = addNode(this.tree, data);    

    function addNode(currentNode, data) {
      if (!currentNode) {
        return new Node(data);
      }
  
      if (currentNode.data === data) {
        return currentNode;
      }
  
      if (data < currentNode.data) {
        currentNode.left = addNode(currentNode.left, data);
      } else {
        currentNode.right = addNode(currentNode.right, data);
      }
  
      return currentNode;
    }
  }

  has(data) {
    return searchNode(this.tree, data);    

    function searchNode(currentNode, data) {
      if (!currentNode) {
        return false;
      }
  
      if (currentNode.data === data) {
        return true;
      }
  
      return data < currentNode.data ? 
        searchNode(currentNode.left, data) : 
        searchNode(currentNode.right, data);
    }
  }

  find(data) {
    return findNode(this.tree, data); 
    
    function findNode(currentNode, data) {
      if (!currentNode) {
        return null;
      }
  
      if (currentNode.data === data) {
        return currentNode;
      }
  
      return data < currentNode.data ? 
        findNode(currentNode.left, data) : 
        findNode(currentNode.right, data);
    }
  }

  remove(data) {
    this.tree = removeNode(this.tree, data); 
    
    function removeNode(currentNode, data) {
      if (!currentNode) {
        return null;
      }  

      if (data < currentNode.data) {
        currentNode.left = removeNode(currentNode.left, data);
        return currentNode;
      }else if (data > currentNode.data) {
        currentNode.right = removeNode(currentNode.right, data);
        return currentNode;
      } else {
        if (!currentNode.left && !currentNode.right) {
          return null;
        }

        if (!currentNode.left) {
          currentNode = currentNode.right;
          return currentNode;
        }

        if (!currentNode.right) {
          currentNode = currentNode.left;
          return currentNode;
        }

        let minFromRight = currentNode.right;

        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        
        currentNode.data = minFromRight.data;

        currentNode.right = removeNode(currentNode.right, minFromRight.data);

        return currentNode;
      }
    }
  }

  min() {
    if (!this.tree) {
      return;
    }

    let node = this.tree;

    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    if (!this.tree) {
      return;
    }

    let node = this.tree;

    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};