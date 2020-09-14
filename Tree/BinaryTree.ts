//二叉树

import { SqStack } from "../Stack/SqStack";

export class BinaryTree {
    /**
     * 创建二叉树
     * @param str 二叉树括号表示法字符串
     */
    constructor(str: string) {
        this.createBTNode(str);
    }

    private head: BTNode | null = null;

    /**
     * 创建二叉树
     * @param str 
     */
    private createBTNode(str: string) {
        let res: BTNode | null = null;
        const stack = new SqStack<BTNode>();
        let k = 0, p: BTNode;
        str.split('').forEach(item => {
            switch (item) {
                case '(':
                    k = 1;
                    stack.push(p);
                    break;
                case ')':
                    stack.pop();
                    break;
                case ',':
                    k = 2;
                    break;
                default:
                    p = new BTNode(item);
                    if (!res) {
                        res = p;
                    } else {
                        const sTop = stack.getTop() as BTNode;
                        switch (k) {
                            case 1:
                                sTop.lChild = p;
                                break;
                            case 2:
                                sTop.rChild = p;
                                break;
                        }
                    }
                    break;
            }
        })
        this.head = res;
    }

    /**
     * 销毁二叉树
     */
    destroyBT() {

    }

    findNode(ele) {

    }

    lChildNode() {

    }

    rChildNode() {

    }

    BTNodeDepth() {

    }

    /**
     * 返回二叉树括号表示法字符串
     */
    dispBTNode(): string {
        if (this.head) {
            let str = this.head.data;
            return str;
        }
        return null
    }

    private getBTNodeData(node: BTNode): string {
        if (!node) {
            // if () {

            // }
        }
        return null
    }
}

/**
 * 二叉树节点
 */
export class BTNode {
    constructor(data?: any) {
        this.data = data;
    }
    /**节点值 */
    data: any | null;
    /**左子树 */
    lChild: BTNode | null = null;
    /**右子树 */
    rChild: BTNode | null = null;
}

//test code
const bTree = new BinaryTree("a(b(d(,g)),c(e,f))");
console.log('bTree', bTree)