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
        this.root = this.insertNode(this.root, key);
    }

    /**
     * 查找元素
     * @param key
     */
    searchkey(key: T): BSTNode<T> | boolean {
        return this.searchkeyNode(this.root, key);
    }

    /**
     * 中序遍历
     */
    inOrderTraverse(callback: Function) {
        this.inOrderTraverseNode(this.root, callback);
    }

    /**
     * 先序遍历
     */
    preOrderTraverse(callback: Function) {
        this.preOrderTraverseNode(this.root, callback);
    }

    /**
     * 后序遍历
     */
    postOrderTraverse(callback: Function) {
        this.postOrderTraverseNode(this.root, callback);
    }

    /**
     * 最小值节点
     */
    min(): T | null {
        return this.root == null ? null : this.minNode(this.root);
    }

    /**
     * 最大值节点
     */
    max(): T | null {
        return this.root == null ? null : this.maxNode(this.root);
    }

    /**
     * 节点移除
     */
    remove(item: T) {
        this.root = this.removeNode(this.root, item);
    }

    /**
     * 递归插入节点
     * @param node 基准节点
     * @param key 待插入的节点值
     */
    private insertNode(node: BSTNode<T>, key: T) {
        if (node == null) {
            return new BSTNode(key);
        }
        if (Number(node.key) < Number(key)) {
            node.rNode = this.insertNode(node.rNode, key);
        } else {
            node.lNode = this.insertNode(node.lNode, key);
        }
        return node;
    }

    /**
     * 递归查找元素
     * @param node 基准节点
     * @param key 匹配值
     */
    private searchkeyNode(node: BSTNode<T>, key: T): BSTNode<T> | boolean {
        if (node == null) {
            return false;
        }
        if (key < node.key) {
            return this.searchkeyNode(node.lNode, key);
        } else if (key > node.key) {
            return this.searchkeyNode(node.rNode, key);
        } else {
            return node;
        }
    }

    /**
     * 递归中序遍历
     * @param node
     * @param callback
     */
    private inOrderTraverseNode(node: BSTNode<T> | null, callback: Function) {
        if (node == null) {
            return;
        }
        this.inOrderTraverseNode(node.lNode, callback);
        callback(node);
        this.inOrderTraverseNode(node.rNode, callback);
    }

    /**
     * 递归先序遍历
     */
    private preOrderTraverseNode(node: BSTNode<T> | null, callback: Function) {
        if (node == null) {
            return;
        }
        callback(node);
        this.preOrderTraverseNode(node.lNode, callback);
        this.preOrderTraverseNode(node.rNode, callback);
    }

    /**
     * 递归后序遍历
     */
    private postOrderTraverseNode(node: BSTNode<T> | null, callback: Function) {
        if (node == null) {
            return;
        }
        this.postOrderTraverseNode(node.lNode, callback);
        this.postOrderTraverseNode(node.rNode, callback);
        callback(node);
    }

    /**
     * 递归最小节点
     * @param node
     */
    private minNode(node: BSTNode<T>): T {
        if (node.lNode == null) {
            return node.key;
        }
        return this.minNode(node.lNode);
    }

    /**
     * 递归最大节点
     */
    private maxNode(node: BSTNode<T>): T {
        if (node.lNode == null) {
            return node.key;
        }
        return this.maxNode(node.rNode);
    }

    /**
     * 递归删除节点
     * @param node
     * @param item
     */
    private removeNode(node: BSTNode<T> | null, item: T): BSTNode<T> | null {
        if (node == null) {
            return null;
        }
        if (node.key < item) {
            node.rNode = this.removeNode(node.rNode, item);
            return node;
        } else if (node.key > item) {
            node.lNode = this.removeNode(node.lNode, item);
            return node;
        }

        // 节点值匹配时
        if (node.lNode == null && node.rNode == null) {
            // {1} 待删除节点为叶子节点
            node = null;
            return node;
        } else if (node.lNode == null) {
            // {2} 待删除节点只有右节点
            node = node.rNode;
            return node;
        } else if (node.rNode == null) {
            // {3} 待删除节点只有右节点
            node = node.lNode;
            return node;
        } else {
            // {4} 待删除节点既有左节点，又有右节点
            node.key = this.minNode(node.rNode);
            node.rNode = this.removeNode(node.rNode, node.key);
            return node;
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

// type Node<T> = BSTNode<T> | null;

const tree = new BinarySearchTree<number>();
tree.insert(30);
tree.insert(25);
tree.insert(36);
tree.insert(20);
tree.insert(28);
tree.insert(32);
tree.insert(40);
console.log(JSON.stringify(tree));
// console.log(tree.searchkey(53));
// tree.inOrderTraverse((node) => {
//     console.log(node.key);
// });
// tree.preOrderTraverse((node) => {
//     console.log(node.key);
// });
// tree.postOrderTraverse((node) => {
//     console.log(node.key);
// });
// console.log(tree.max());
tree.remove(30);
console.log(JSON.stringify(tree));
