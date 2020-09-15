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
     * 销毁二叉树
     */
    destroyBT() {
        this.head = null;
    }

    /**
     * 查找元素值为ele的节点
     * @param ele
     */
    findNode(ele: string): BTNode | null {
        let p: BTNode;
        if (this.head === null) {
            return null;
        }
        if (this.head.data === ele) {
            return this.head;
        }
        // 深度优先遍历，定义栈存储待查找变量
        let stack = new SqStack<BTNode>();
        stack.push(this.head);
        while (!stack.stackEmpty()) {
            const sTop = stack.getTop() as BTNode;
            if (sTop.data === ele) {
                return sTop;
            }
            p = stack.pop() as BTNode;
            if (p.lChild) {
                stack.push(p.lChild);
            }
            if (p.rChild) {
                stack.push(p.rChild);
            }
        }
        return null;
    }

    /**
     * 返回二叉树高度
     */
    getBTNodeDepth(): number {
        return this.getNodeDepth(this.head);
    }

    /**
     * 返回二叉树括号表示法字符串
     */
    dispBTNode(): string {
        if (this.head) {
            return this.getBTNode(this.head);
        }
        return null;
    }

    /**
     * 创建二叉树
     * @param str
     */
    private createBTNode(str: string) {
        let res: BTNode | null = null;
        //栈保存节点
        const stack = new SqStack<BTNode>();
        //标记左右子树：1→左子树，2→右子树
        let k = 0,
            p: BTNode;
        str.split("").forEach((item) => {
            switch (item) {
                case "(":
                    k = 1;
                    //节点有子元素，将节点入栈
                    stack.push(p);
                    break;
                case ")":
                    //节点子元素计算完成，出栈
                    stack.pop();
                    break;
                case ",":
                    k = 2;
                    break;
                default:
                    //计算当前节点值，并在链表中找到它所处的位置
                    //即栈顶元素的子节点
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
        });
        this.head = res;
    }

    /**
     * 递归计算元素值
     * @param node
     * @param data
     */
    private getBTNode(node: BTNode): string {
        let str = "";
        if (node !== null) {
            str += node.data;
            if (node.lChild !== null || node.rChild !== null) {
                str += "(";
                str += this.getBTNode(node.lChild);
                if (node.rChild !== null) {
                    str += ",";
                    str += this.getBTNode(node.rChild);
                }
                str += ")";
            }
        }
        return str;
    }

    /**
     * 计算节点高度
     * @param node
     */
    private getNodeDepth(node: BTNode): number {
        let lDepth: number, rDepth: number;
        if (node === null) {
            return 0;
        } else {
            lDepth = this.getNodeDepth(node.lChild);
            rDepth = this.getNodeDepth(node.rChild);
            return lDepth > rDepth ? lDepth + 1 : rDepth + 1;
        }
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
// console.log("bTree", JSON.stringify(bTree));
console.log("findNode", bTree.findNode("c"));
console.log("dispBTNode", bTree.dispBTNode());
console.log("getBTNodeDepth", bTree.getBTNodeDepth());
