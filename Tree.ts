//树的基本算法实现
//二叉链存储结构

class BTreeNode<T>{
    /**元素值 */
    private data: T;
    /**左子树 */
    private lchild: BTreeNode<T> | null;
    /**右子树 */
    private rchild: BTreeNode<T> | null;
}

class BTree<T>{
    /**
     * 构造函数
     * @param str 树的括号表示字符串
     */
    constructor(str: string) {
        this.initTree(str)
    }

    /**根节点 */
    private rootNode: BTreeNode<T> | null;

    private initTree(str: string) {

    }
}