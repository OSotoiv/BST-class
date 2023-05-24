class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    if (!this.root) {
      this.root = new Node(val);
      return this;
    }
    let currNode = this.root;
    while (currNode) {
      if (currNode.val < val) {
        if (!currNode.right) {
          currNode.right = new Node(val);
          return this;
        }
        currNode = currNode.right;
      }
      if (val < currNode.val) {
        if (!currNode.left) {
          currNode.left = new Node(val)
          return this;
        }
        currNode = currNode.left
      }
    }
    return this;
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, node = this.root) {
    if (!node) {
      this.root = new Node(val);
      return this;
    }
    if (node.val < val) {
      if (!node.right) {
        node.right = new Node(val)
        return this;
      }
      return this.insertRecursively(val, node.right);
    }
    if (val < node.val) {
      if (!node.left) {
        node.left = new Node(val)
        return this;
      }
      return this.insertRecursively(val, node.left);
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val, node = this.root) {
    while (node) {
      if (node.val === val) return node;

      if (node.val < val) {
        node = node.right
      } else {
        node = node.left
      }
    }
    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, node = this.root) {
    if (!node) return undefined;
    if (val === node.val) return node;

    if (node.val < val) {
      return this.findRecursively(val, node.right)
    } else {
      return this.findRecursively(val, node.left)
    }
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder(node = this.root, arr = []) {
    arr.push(node.val)
    if (!node.left && !node.right) return arr;

    if (node.left) {
      this.dfsPreOrder(node.left, arr)
    }
    if (node.right) {
      this.dfsPreOrder(node.right, arr)
    }
    return arr
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder(node = this.root, arr = []) {
    if (!node.left && !node.right) return arr.push(node.val);

    if (node.left) {
      this.dfsInOrder(node.left, arr)
    }
    arr.push(node.val)
    if (node.right) {
      this.dfsInOrder(node.right, arr)
    }
    return arr
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder(node = this.root, arr = []) {
    // if (!node.left && !node.right) return arr.push(node.val);

    if (node.left) {
      this.dfsPostOrder(node.left, arr)
    }
    if (node.right) {
      this.dfsPostOrder(node.right, arr)
    }
    arr.push(node.val)
    return arr
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs(node = [this.root], arr = []) {
    while (node.length) {
      const currNode = node.shift()
      arr.push(currNode.val)
      if (currNode.left) node.push(currNode.left)
      if (currNode.right) node.push(currNode.right)
    }
    console.log(arr)
    return arr
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    this.root = this._removeNode(this.root, val);
  }

  _removeNode(node, val) {
    if (node === null) {
      return null;
    }

    if (val < node.val) {
      node.left = this._removeNode(node.left, val);
    } else if (val > node.val) {
      node.right = this._removeNode(node.right, val);
    } else {
      // Node with the given value found
      if (node.left === null && node.right === null) {
        // Case 1: Node is a leaf node
        return null;
      } else if (node.left === null) {
        // Case 2: Node has only a right child
        return node.right;
      } else if (node.right === null) {
        // Case 3: Node has only a left child
        return node.left;
      } else {
        // Case 4: Node has both left and right children
        const minNode = this._findMinNode(node.right);
        node.val = minNode.val;
        node.right = this._removeNode(node.right, minNode.val);
      }
    }

    return node;
  }

  _findMinNode(node) {
    if (node.left === null) {
      return node;
    }
    return this._findMinNode(node.left);
  }


  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    return this._checkBalanced(this.root) !== -1;
  }

  _checkBalanced(node) {
    if (node === null) {
      return 0;
    }

    const leftHeight = this._checkBalanced(node.left);
    if (leftHeight === -1) {
      return -1;
    }

    const rightHeight = this._checkBalanced(node.right);
    if (rightHeight === -1) {
      return -1;
    }

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return -1;
    }

    return Math.max(leftHeight, rightHeight) + 1;
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */


  findSecondHighest() {
    if (!this.root || (!this.root.left && !this.root.right)) {
      return undefined;
    }

    let current = this.root;
    let parent = null;

    while (current.right) {
      parent = current;
      current = current.right;
    }

    if (current.left) {
      current = current.left;

      while (current.right) {
        current = current.right;
      }

      return current.val;
    }

    return parent.val;
  }
}

module.exports = BinarySearchTree;
