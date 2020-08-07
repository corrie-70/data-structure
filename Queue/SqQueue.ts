//顺序队列实现

/**元素值对象类型 */
export interface ElementType<T> {
    [id: number]: T;
}

/**顺序存储结构的队列实现 */
export class SqQueue<T> {
    /**队首指针 */
    private front: number;
    /**队尾指针 */
    private rear: number;
    /**最大长度 */
    private maxSize: number | undefined;
    //不使用数组是因为当数组从头部出一个元素后，整个索引会重新从0排列，之后删除元素错误
    /**元素对象 */
    private data: ElementType<T>;

    /**初始化空队列 */
    constructor(maxSize?: number) {
        this.initQueue(maxSize);
    }

    private initQueue(maxSize?: number) {
        this.front = -1;
        this.rear = -1;
        this.maxSize = maxSize;
        this.data = {};
    }

    /**销毁队列 */
    destroyQueue() {
        this.initQueue();
    }

    /**判断队列是否为空 */
    queueEmpty(): boolean {
        return this.front == this.rear;
    }

    /**进队列 */
    enQueue(ele: T): boolean {
        //尾指针等于最大长度减一时，队列满
        if (!!this.maxSize && this.rear == this.maxSize - 1) {
            return false;
        }
        this.rear++;
        this.data[this.rear] = ele;
        return true;
    }

    /**出队列 */
    deQueue(): T | boolean {
        //队列为空
        if (this.front == this.rear) {
            return false;
        }
        this.front++;
        const ele = this.data[this.front];
        delete this.data[this.front];
        return ele;
    }

    /** 获得队首指针*/
    getFront() {
        return this.front;
    }

    /** 获得队尾指针*/
    getRear() {
        return this.rear;
    }
}

//环形队列
//判断队满、队空、进队、出队的算法变了，其余同上
//删除元素后，再进队，由于队满条件牺牲了一个元素的控件，所有实际存储最大是maxSize-1

/**环形队列实现 */
export class CirQueue<T> {
    /**队首指针 */
    private front: number;
    /**队尾指针 */
    private rear: number;
    /**最大长度 */
    private maxSize: number | undefined;
    /**元素对象 */
    private data: ElementType<T>;

    /**初始化空队列 */
    constructor(maxSize?: number) {
        this.initQueue(maxSize);
    }

    /**初始化队列 */
    private initQueue(maxSize?: number) {
        this.front = -1;
        this.rear = -1;
        this.maxSize = maxSize;
        this.data = {};
    }

    /**销毁队列 */
    destroyQueue() {
        this.initQueue();
    }

    /**判断队列是否为空 */
    queueEmpty(): boolean {
        return this.rear == this.front;
    }

    /**进队列 */
    enQueue(ele: T): boolean {
        //队满
        if ((this.rear + 1) % this.maxSize == this.front) {
            return false;
        }
        this.rear = (this.rear + 1) % this.maxSize;
        this.data[this.rear] = ele;
        return true;
    }

    /**出队列 */
    deQueue(): T | boolean {
        //队列为空
        if (this.front == this.rear) {
            return false;
        }
        this.front = (this.front + 1) % this.maxSize;
        const ele = this.data[this.front];
        delete this.data[this.front];
        return ele;
    }
}

//环形队列
//用队列中元素个数替代尾指针
//实际存储最大个数是maxSize，与CirQueue区别

/**环形队列（元素个数实现） */
export class CircleCountQueue<T> {
    /**队首指针 */
    private front: number;
    /**队列元素个数 */
    private count: number;
    /**最大长度 */
    private maxSize: number | undefined;
    /**元素对象 */
    private data: ElementType<T>;

    /**初始化空队列 */
    constructor(maxSize?: number) {
        this.initQueue(maxSize);
    }

    /**初始化队列 */
    private initQueue(maxSize?: number) {
        this.front = -1;
        this.count = 0;
        this.maxSize = maxSize;
        this.data = {};
    }

    /**销毁队列 */
    destroyQueue() {
        this.initQueue();
    }

    /**判断队列是否为空 */
    queueEmpty(): boolean {
        return this.count == 0;
    }

    /**进队列 */
    enQueue(ele: T): boolean {
        let rear: number;
        //队满
        if (this.count == this.maxSize) {
            return false;
        }
        this.count++;
        rear = (this.front + this.count) % this.maxSize;
        this.data[rear] = ele;
        return true;
    }

    /**出队列 */
    deQueue(): T | boolean {
        //队列为空
        if (this.count == 0) {
            return false;
        }
        this.front = (this.front + 1) % this.maxSize;
        const ele = this.data[this.front];
        delete this.data[this.front];
        this.count--;
        return ele;
    }
}

let maze = [
    [1, 1, 0, 1, 1, 1, 0, 1],
    [1, 1, 0, 1, 1, 1, 0, 1],
    [1, 1, 1, 1, 0, 0, 1, 1],
    [1, 0, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 1, 1],
    [1, 0, 1, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 1],
    [0, 1, 1, 1, 1, 1, 1, 1],
];

/**迷宫节点类 */
class QNode {
    constructor(i: number, j: number, pre: number) {
        this.i = i;
        this.j = j;
        this.pre = pre;
    }
    /**横坐标 */
    i: number;
    /**纵坐标 */
    j: number;
    /**父节点索引 */
    pre: number;
}

//顺序队列求解迷宫路径
//算法思想：采用广度优先遍历思想，节点出队列时，遍历其四周值为1的点，加入队列中，并且记录父节点的位置
//父节点的索引值通过队列的front指针获取，用于结果溯源
//记录出队的所有节点，节点索引即出队列时的front值
//根据出口的pre值，溯源到索引相等的点，直到找到入口坐标
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
): boolean | QNode[] {
    let queue = new SqQueue<QNode>(),
        i: number,
        j: number,
        di: number;

    let inPoint = new QNode(inPointi, inPointj, -1);
    queue.enQueue(inPoint);
    maze[inPointi][inPointj] = -1;
    let res: QNode[] = [];

    while (!queue.queueEmpty()) {
        let frontNode = queue.deQueue() as QNode;
        i = frontNode.i;
        j = frontNode.j;

        //如果不使用SqQueue类，重新定义一个简单的顺序队列
        //删除时只移动front指针，就不需要新变量保存删除节点
        res.push(frontNode);

        if (i == outPointi && j == outPointj) {
            return tracePath(res);
        }
        for (di = 0; di < 4; di++) {
            switch (di) {
                case 0:
                    i = frontNode.i - 1;
                    j = frontNode.j;
                    break;
                case 1:
                    i = frontNode.i;
                    j = frontNode.j + 1;
                    break;
                case 2:
                    i = frontNode.i + 1;
                    j = frontNode.j;
                    break;
                case 3:
                    i = frontNode.i;
                    j = frontNode.j - 1;
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

            if (maze[i][j] == 1) {
                //关键   新节点的pre值为删除节点的索引值，用于反向溯源路径
                let newNode = new QNode(i, j, queue.getFront());
                queue.enQueue(newNode);
                maze[i][j] = 0;
            }
        }
    }
    return false;
}

/**
 * 返回迷宫路径
 * @param path 出队的节点数组
 */
function tracePath(path: QNode[]): QNode[] {
    let i = path.length - 1;
    let result: QNode[] = [];
    while (i > -1) {
        result.push(path[i]);
        i = path[i].pre;
    }
    return result.reverse();
}

console.log(getMazePath(maze, 0, 0, 7, 7));

//test code
// let queue = new SqQueue<number>(5);
// console.log("queueEmpty", queue.queueEmpty());
// const data = [1, 2, 3, 4, 5];
// for (let i = 0; i < data.length; i++) {
//     queue.enQueue(data[i]);
// }
// console.log('queue', queue);
// console.log('deQueue', queue.deQueue(), queue.deQueue());
// console.log('queue', queue);
// console.log(queue.enQueue(1)); //即使已经出队一个元素，还是不能再入队新的元素
// console.log('queueEmpty', queue.queueEmpty());

// let cQueue = new CirQueue<number>(5);
// for (let i = 0; i < data.length; i++) {
//     cQueue.enQueue(data[i]);
// }
// console.log('cQueue', cQueue);
// console.log('deQueue', cQueue.deQueue(), cQueue.deQueue());
// console.log('cQueue', cQueue);
// console.log('cQueue', cQueue.enQueue(6))
// console.log('cQueue', cQueue.enQueue(7))
// console.log('cQueue', cQueue);

// let circleCountQueue = new CircleCountQueue<number>(5);
// for (let i = 0; i < data.length; i++) {
//     circleCountQueue.enQueue(data[i]);
// }
// console.log('circleCountQueue', circleCountQueue);
// console.log('deQueue', circleCountQueue.deQueue(), circleCountQueue.deQueue());
// console.log('circleCountQueue', circleCountQueue);
// console.log('circleCountQueue', circleCountQueue.enQueue(6))
// console.log('circleCountQueue', circleCountQueue.enQueue(7))
// console.log('circleCountQueue', circleCountQueue.enQueue(8))
// console.log('circleCountQueue', circleCountQueue);
