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

    /**
     * 查找元素
     * @param key
     */
    searchkey(key: T): BSTNode<T> | boolean {
        if (!this.root) {
            return false;
        }

        return this.searchkeyNode(this.root, key);
    }

    /**
     * 中序遍历
     */
    inOrderTraverse() {}

    preOrderTraverse() {}

    postOrderTraverse() {}

    min() {}

    max() {}

    remove() {}

    /**
     * 递归插入节点
     * @param node 基准节点
     * @param key 待插入的节点值
     */
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

    /**
     * 递归查找元素
     * @param node 基准节点
     * @param key 匹配值
     */
    private searchkeyNode(node: BSTNode<T>, key: T): BSTNode<T> | boolean {
        let res: BSTNode<T> | boolean;
        if (!node) {
            res = false;
            return res;
        }
        if (key < node.key) {
            if (!node.lNode) {
                res = false;
            }
            res = this.searchkeyNode(node.lNode, key);
        } else if (key > node.key) {
            if (!node.rNode) {
                res = false;
            }
            res = this.searchkeyNode(node.rNode, key);
        } else {
            res = node;
        }
        return res;
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
tree.insert(12);
tree.insert(24);
tree.insert(28);
tree.insert(37);
tree.insert(40);
tree.insert(45);
tree.insert(53);
console.log(JSON.stringify(tree));
console.log(tree.searchkey(52));
