//顺序存储结构的栈算法实现
export class SqStack<T> {
    /**栈顶指针 */
    private top: number;
    /**最大长度 */
    private maxSize: number | undefined;
    /**元素数组（也能用对象实现） */
    private data: T[] = [];

    /**栈初始化 */
    constructor(maxSize?: number) {
        this.top = -1;
        this.maxSize = maxSize;
    }

    /**销毁栈 */
    destroyStack() {
        this.top = -1;
        this.data = [];
        this.maxSize = undefined;
    }

    /**判断栈空 */
    stackEmpty(): boolean {
        return this.top == -1;
    }

    /**进栈 */
    push(ele: T): boolean {
        if (!!this.maxSize && this.top == this.maxSize - 1) {
            return false;
        }
        this.top++;
        this.data.push(ele);
        return true;
    }

    /**出栈 */
    pop(): boolean | T {
        if (this.top == -1) {
            return false;
        }
        this.top--;
        return this.data.pop();
    }

    /**返回栈顶元素 */
    getTop(): boolean | T {
        if (this.top == -1) {
            return false;
        }
        return this.data[this.top];
    }

    /**获取内容数组 */
    getData(): T[] {
        return this.data;
    }
}

//使用顺序栈判断字符串是否为对称字符串
//算法思想：字符出栈顺序与原字符串顺序一致
/**对称字符串判断 */
function symmetry(str: string): boolean {
    let stack = new SqStack();
    for (let i = 0; i < str.length; i++) {
        stack.push(str[i]);
    }
    for (let i = 0; i < str.length; i++) {
        let ele = stack.pop();
        if (ele != str[i]) {
            return false;
        }
    }
    stack.destroyStack();
    return true;
}

/**
 * 迷宫节点类
 */
class MazeNode {
    constructor(i: number, j: number, di: number) {
        this.i = i;
        this.j = j;
        this.di = di;
    }
    /**横坐标 */
    i: number;
    /**纵坐标 */
    j: number;
    /**方向状态，东西南北对应0,1,2,3，初始值为-1 */
    di: number;
}

let maze = [
    [1, 1, 1, 1, 1],
    [0, 1, 0, 1, 1],
    [0, 1, 1, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 1, 1, 1, 1],
];

//顺序栈求解迷宫问题简单路径
//算法思想：采用深度遍历思想，顺时针寻找节点四周可以走的点，进栈，将节点的方向值保存在di中
//再顺时针遍历新进栈节点四周，如果节点四周都不能走，节点出栈，根据保存的节点di值探寻下一个方向
/**
 * 获得迷宫路径
 * @param maze 迷宫数组
 * @param inPointi 入口横坐标
 * @param inPointj 入口纵坐标
 * @param outPointi 出口横坐标
 * @param outPointj 出口横坐标
 */
function getMazePath(
    maze: number[][],
    inPointi: number,
    inPointj: number,
    outPointi: number,
    outPointj: number
): boolean | MazeNode[] {
    let stack = new SqStack<MazeNode>(),
        di: number,
        i: number,
        j: number,
        //标记节点在迷宫图里是否为可走状态，0不可走，1可走
        isBanned = 0;
    let inPoint = new MazeNode(inPointi, inPointj, -1);
    stack.push(inPoint);
    maze[inPointi][inPointj] = -1;

    while (!stack.stackEmpty()) {
        let topNode = stack.getTop() as MazeNode;
        i = topNode.i;
        j = topNode.j;
        di = topNode.di;
        if (i == outPointi && j == outPointj) {
            return stack.getData();
        }
        isBanned = 0;
        //在(i,j)四周寻找可以走的节点
        while (di < 4 && isBanned == 0) {
            di++;
            switch (di) {
                case 0:
                    i = topNode.i - 1;
                    j = topNode.j;
                    break;
                case 1:
                    i = topNode.i;
                    j = topNode.j + 1;
                    break;
                case 2:
                    i = topNode.i + 1;
                    j = topNode.j;
                    break;
                case 3:
                    i = topNode.i;
                    j = topNode.j - 1;
                    break;
            }
            if (
                i < 0 ||
                i > maze.length - 1 ||
                j < 0 ||
                j > maze[0].length - 1
            ) {
                continue;
            }
            isBanned = maze[i][j];
        }

        if (isBanned == 1) {
            topNode.di = di;
            let newNode = new MazeNode(i, j, -1);
            stack.push(newNode);
            maze[i][j] = 0;
        } else {
            maze[topNode.i][topNode.j] = 0;
            stack.pop();
        }
    }
    return false;
}

console.log(getMazePath(maze, 0, 0, 4, 4));

//test code
// let stack = new SqStack(5);
// console.log('stackEmpty', stack.stackEmpty());
// const data = [1, 2, 3, 4, 5, 6]
// for (let i = 0; i < data.length; i++) {
//     stack.push(data[i]);
// }
// console.log('stack', stack);
// console.log('pop', stack.pop());
// console.log('getTop', stack.getTop());
// console.log('stackEmpty', stack.stackEmpty());
// console.log(symmetry('strts'));
