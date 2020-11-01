// 二叉搜索树：左侧节点存储比其父节点小的值，右侧节点存储比其父节点大的值

/**
 * 二叉搜索树
 */
export class BinarySearchTree<T> {
  constructor() {
    this.root = null;
  }
  private root: BSTNode<T> | null;

  /**
   * 插入键
   * @param key
   */
  insert(key: T) {
    if (this.root == null) {
      this.root = new BSTNode(key);
    } else {
      this.insertNode(this.root, key);
    }
  }

  searchkey(key: T) {}

  /**
   * 中序遍历
   */
  inOrderTraverse() {}

  preOrderTraverse() {}

  postOrderTraverse() {}

  min() {}

  max() {}

  remove() {}

  private insertNode(node: BSTNode<T>, key: T) {
    if (Number(node.key) < Number(key)) {
      if (node.rNode == null) {
        node.rNode = new BSTNode(key);
      } else {
        this.insertNode(node.rNode, key);
      }
    } else {
      if (node.lNode == null) {
        node.lNode = new BSTNode(key);
      } else {
        this.insertNode(node.lNode, key);
      }
    }
  }
}

/**
 * 二叉搜索树节点
 */
export class BSTNode<T> {
  constructor(key?: T) {
    this.key = key;
  }
  key: T | null;
  lNode: BSTNode<T> | null;
  rNode: BSTNode<T> | null;
}

const tree = new BinarySearchTree<number>();
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
console.log(JSON.stringify(tree));
